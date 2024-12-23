import { query } from "../database/db.js";
import bcrypt from 'bcrypt';

const saltRounds = 10; // Sesuaikan jumlah round sesuai kebutuhan keamanan

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const data = await query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        return res.status(201).json({ msg: "Registrasi berhasil!" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ msg: "Username atau email sudah terdaftar." });
        }
        console.error("Error during registration:", error); // Log error untuk debugging
        return res.status(500).json({ msg: "Gagal melakukan registrasi." });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query menggunakan email sebagai pengidentifikasi
        const rows = await query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ msg: "Email tidak ditemukan." });
        }

        const user = rows[0];
        // Verifikasi password menggunakan bcrypt.compare
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Password salah." });
        }

        // ... (proses login berhasil - misalnya, generate token JWT) ...
        return res.status(200).json({ msg: "Login berhasil!" });

    } catch (error) {
        console.error("Error during login:", error); // Log error untuk debugging
        return res.status(500).json({ msg: "Gagal melakukan login." });
    }
};

export { registerUser, loginUser };