import { promisify } from 'util';
import { createClient } from 'redis';
import kue from 'kue';
import express from 'express';

const server = express();
const port = 1245;
const client = createClient();
const availableSeats = 50;
const queue = kue.createQueue();
let reservationEnabled = true;

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('error', (err) => console.error('Redis Client Error', err));

client.on('connect', async () => {
  await setAsync('available_seats', availableSeats);
  console.log('Redis client connected to the server');
});

/**
 * Reserves a specified number of seats from the available seats.
 * @param {number} number - The number of seats to reserve.
 * @param {number} available_seats - The total number of available seats.
 * @returns {number} - The number of remaining available seats after reservation.
 * @throws {Error} - If the number of seats is negative or exceeds the available seats.
 */
function reserveSeat(number, available_seats) {
  if (number < 0) {
    throw new Error('Negative seats are not allowed');
  }

  if (number > available_seats) {
    throw new Error('Not enough seats available');
  }

  return available_seats - number;
}

async function getCurrentAvailableSeats() {
  return parseInt(await getAsync('available_seats'));
}

server.get('/available_seats', async (req, res) => {
  try {
    const availableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: availableSeats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }
  res.json({ status: 'Reservation in process' });
  const reserveSeatJob = queue.create('reserve_seat').save();
  reserveSeatJob.on('complete', () => {
    console.log(`Seat reservation job ${reserveSeatJob.id} completed`);
  });
  reserveSeatJob.on('failed', (errorMessage) => {
    console.log(
      `Seat reservation job ${reserveSeatJob.id} failed: ${errorMessage}`
    );
  });
});

queue.process('reserve_seat', async (job, done) => {
  try {
    const availableSeats = await getCurrentAvailableSeats();
    const newAvailableSeats = reserveSeat(1, availableSeats);
    await setAsync('available_seats', newAvailableSeats);
    if (newAvailableSeats === 0) {
      reservationEnabled = false;
    }
    done();
  } catch (error) {
    done(new Error(error.message));
  }
});

server.get('/process', (_req, res) => {
  queue.process('reserve_seat', async (job, done) => {
    try {
      const availableSeats = await getCurrentAvailableSeats();
      const newAvailableSeats = reserveSeat(1, availableSeats);
      await setAsync('available_seats', newAvailableSeats);
      if (newAvailableSeats === 0) {
        reservationEnabled = false;
      }
      done();
    } catch (error) {
      done(new Error(error.message));
    }
  });
  res.json({ status: 'Queue processing' });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
