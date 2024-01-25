import bcrypt from "bcryptjs";

export const hashedPasswordGenerator = async (password: any) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}