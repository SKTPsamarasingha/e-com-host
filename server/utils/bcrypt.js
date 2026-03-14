import bcrypt from 'bcrypt';

export const hashedPassword = async (pw) => {
    const slt = await bcrypt.genSalt(10)
    return await bcrypt.hashSync(pw, slt)
}

export const comparePassword = async (pw, hash) => {
    return bcrypt.compare(pw, hash)
}