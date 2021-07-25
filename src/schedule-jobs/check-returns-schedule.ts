import schedule from 'node-schedule';
import BookModel from "../models/bookModel";
import UserModel from "../models/userModel";

export default schedule.scheduleJob('*/2 * * * * *', async () => {
    // 0 */12 * * *
    try {
        const books = await BookModel.find({isBorrowed: true});
        if (books.length > 0) {
            books.map(async (book) => {
                if (new Date().getTime() - book.borrowedTime.getTime() > 60000) {
                    console.log(`User ${book.borrowedBy} has been suspended!`);

                    await UserModel.findByIdAndUpdate(book.borrowedBy, {isActive: false});
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
});