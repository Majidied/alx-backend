import kue from 'kue';
const blackList = [4153518780, 4153518781];
const queue = kue.createQueue();

function sendNotification(phoneNumber, message, job, done) {
    if (blackList.includes(phoneNumber)) {
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    job.progress(50);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
