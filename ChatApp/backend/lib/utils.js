import jwt from 'jsonwebtoken';

export const generateToken = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw new Error("Token generation failed");
    }
};