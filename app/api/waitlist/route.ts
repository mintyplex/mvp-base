import dbConnect from '~/lib/utils/db';
import Waitlist from '~/models/waitlist';
import { EmailTemplate } from '~/components/customs/template/email-template';
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await dbConnect(); // Connect to the database

        // Ensure email and username are provided in the request body and are strings
        const { email, username } = req.body;
        if (typeof email !== 'string' || typeof username !== 'string') {
            return res.status(400).json({ message: 'Email and username are required and must be strings.' });
        }

        // Proceed with lowercase transformation now that we've ensured they're strings
        const emailLowerCase = email.toLowerCase();
        const usernameLowerCase = username.toLowerCase();

        // Check for existing email or username before attempting to save
        const existingEmail = await Waitlist.findOne({ email: emailLowerCase });
        if (existingEmail) {
            return res.status(409).json({ message: 'This email is already on the waitlist.' });
        }

        const existingUsername = await Waitlist.findOne({ username: usernameLowerCase });
        if (existingUsername) {
            return res.status(409).json({ message: 'This username is already taken.' });
        }

        const waitlist = new Waitlist({ email: emailLowerCase, username: usernameLowerCase });
        await waitlist.save(); // Save the waitlist entry to the database

        // Assuming EmailTemplate is a function that returns the email body as a string
        const emailBody = EmailTemplate({ username: usernameLowerCase });

        const data = await resend.emails.send({
            from: 'no-reply <hello@mintyplex.com>',
            to: [emailLowerCase],
            subject: 'Waitlist',
            text: 'testing', // Replace 'testing' with your actual text content, if necessary
            react: emailBody,
        });

        res.status(200).json({ message: 'You have been added to the waitlist and an email has been sent!' });
    } catch (error) {
        console.error('Error subscribing to waitlist or sending email:', error);
        res.status(500).json({ message: 'An error occurred during the subscription process.' });
    }
}
