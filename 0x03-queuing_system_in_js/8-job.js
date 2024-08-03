/**
 * Creates push notification jobs and adds them to a queue.
 * @param {Array} jobs - An array of job data.
 * @param {Object} queue - The queue object to add the jobs to.
 * @throws {Error} If jobs is not an array.
 */
function createPushNotificationsJobs(jobs, queue) {
  try {
    jobs.forEach((jobData) => {
      const job = queue
        .create('push_notification_code_2', jobData)
        .save((error) => {
          if (!error) console.log(`Notification job created: ${job.id}`);
        });

        job.on('complete', () => console.log(`Notification job ${job.id} completed`));
        job.on('failed', (error) => console.log(`Notification job ${job.id} failed: ` + error));
        job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
    });
  } catch (error) {
    throw new Error(`Jobs is not an array`);
  }
}

export default createPushNotificationsJobs;
