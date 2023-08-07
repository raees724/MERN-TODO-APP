import bcrypt from 'bcrypt'
import { validateSignup } from "../helpers/validator.js";
import { User } from '../models/User.js';
import { validateSignin } from '../helpers/signinValidator.js';
import jwt from 'jsonwebtoken'

export const signup = (async (req, res) => {
    try {
        const { error, value } = validateSignup(req.body);

        if (error) {
            res.status(422).json(error.details[0]?.message)
        } else {
            const hash = await bcrypt.hash(value?.password, 10);
            const newUser = new User({
                username: value?.username,
                email: value?.email,
                password: hash
            });

            await newUser.save();
            res.status(201).json(newUser)
        }

    } catch (error) {
        res.status(500).json({ err: error })
    }
});

export const login = async (req, res) => {
    try {
        const { error, value } = validateSignin(req.body);
        if (error) {
            return res.status(422).json(error.details[0]?.message)
        } else {
            const user = await User.findOne({ email: value?.email });
            console.log(user)

            if (!user) {
                return res.status(401).json({ error: 'unauthorized' });
            }

            const match = await bcrypt.compare(value?.password, user?.password);

            if (!match) return res.status(401).json({ err: 'unauthorized user' });

            const accessToken = jwt.sign({
                "Userinfo": {
                    "id": user?._id,
                    "email": user?.email
                }
            },
                process.env.ACCESSTOKEN,
                {
                    expiresIn: '15min'
                }
            );

            const refreshToken = jwt.sign(
                {
                    "id": user?._id,
                    "email": user?.email

                },
                process.env.REFRESHTOKEN,
                { expiresIn: '7d' }
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ accessToken })
        }


    } catch (error) {
        res.status(500).json({ err: error })

    }
}

export const refresh = (async (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

        const refreshToken = cookies.jwt;

        jwt.verify(
            refreshToken,
            process.env.REFRESHTOKEN,
            (async (err, data) => {
                if (err) return res.status(403).json({ error: 'Forbidden' });
                const user = await User.findOne({ _id: data?.id });

                if (!user) return res.status(401).json({ message: 'Unauthorized' });

                const accessToken = jwt.sign(
                    {
                        "Userinfo": {
                            "id": user?._id,
                            "email": user?.email
                        }
                    },
                    process.env.ACCESSTOKEN,
                    { expiresIn: '15min' }
                )

                res.json({ accessToken })
            })
        )

    } catch (error) {
        res.status(500).json({ err: error })

    }
})

//signout
export const signout = (async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(204).json({ err: "can't clear cookie" })
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({ message: 'Cookie cleared' })

    } catch (error) {
        res.status(500).json({ err: error })

    }
})


