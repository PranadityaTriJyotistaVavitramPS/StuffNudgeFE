import React, { useState } from 'react';
import { updateUser } from '../utils/network-data';

export default function Profile({ user, onSaveProfile }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const handleProfileSubmit = e => {
    e.preventDefault();
    onSaveProfile({ username, email });
  };

  const onChangePassword = async(password,newPassword) =>{
    const result = await updateUser({password,newPassword})

    console.log(result)
    if (result.error) {
      alert('Password atau Username Salah');
    } else {
      alert('password berhasil disimpan.');
    }
  }

  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok.');
      return;
    }
    console.log("ini currentPassword",currentPassword);
    console.log("ini new Password", newPassword);
    onChangePassword(currentPassword, newPassword );
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="profile-container">
      <h2>Profil Pengguna</h2>
      <form className="profile-form" onSubmit={handleProfileSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <button type="submit">Simpan Profil</button>
      </form>

      <h2>Ganti Password</h2>
      <form className="profile-form" onSubmit={handlePasswordSubmit}>
        <label>Password Saat Ini</label>
        <input
          type="password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          required
        />

        <label>Password Baru</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />

        <label>Konfirmasi Password Baru</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Ganti Password</button>
      </form>
    </div>
  );
}
