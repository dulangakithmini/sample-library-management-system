import schedule from 'node-schedule';
import BookModel from "../models/bookModel";

export default schedule.scheduleJob('*/2 * * * * *', async () => {
    const books = await BookModel.find({isBorrowed: true});

    if (books.length > 0) {
        books.forEach((book) => {
            if (new Date().getTime() - book.borrowedTime.getTime() > 604800000) {
                console.log(`User ${book.borrowedBy} has been suspended!`);
            }
        });
    }
});