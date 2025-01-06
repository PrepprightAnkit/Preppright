// components/encrypt.js
class EncryptionService {
    static async getKey() {
      if (!this.cryptoKey) {
        const response = await fetch('/api/encryption-key', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!response.ok) throw new Error('Failed to get encryption key');
        
        const { key } = await response.json();
        const keyBytes = atob(key)
          .split('')
          .map(char => char.charCodeAt(0));
        
        this.cryptoKey = await window.crypto.subtle.importKey(
          'raw',
          new Uint8Array(keyBytes),
          { name: 'AES-GCM' },
          false,
          ['decrypt']
        );
      }
      return this.cryptoKey;
    }
  
    static async decrypt(encryptedObj) {
      const key = await this.getKey();
      const iv = new Uint8Array(atob(encryptedObj.iv)
        .split('')
        .map(char => char.charCodeAt(0)));
      const authTag = new Uint8Array(atob(encryptedObj.authTag)
        .split('')
        .map(char => char.charCodeAt(0)));
      const encryptedData = new Uint8Array(atob(encryptedObj.encryptedData)
        .split('')
        .map(char => char.charCodeAt(0)));
  
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
          additionalData: authTag
        },
        key,
        encryptedData
      );
  
      return JSON.parse(new TextDecoder().decode(decrypted));
    }
  }
  
  export default EncryptionService;
  
  // Modified loginUser function
  const loginUser = asynchandler(async (req, res) => {
      const { email, password } = req.body;
      if (!email) throw new ApiError(400, "Email is required");
  
      const user = await User.findOne({ email });
      if (!user) throw new ApiError(404, "User does not exist");
  
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");
  
      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
      const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
      const encryptedResponse = encryptionUtils.encrypt(loggedInUser);
  
      const options = {
          httpOnly: true,
          secure: true
      };
  
      return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(encryptedResponse);
  });
  
  // Modified Login component (relevant parts)
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await dispatch(login(formData));
          if (response.payload) {
              const decryptedData = await EncryptionService.decrypt(response.payload);
              // Store or process decrypted user data
              setTimeout(() => {
                  navigate('/');
              }, 2000);
          }
      } catch (error) {
          console.error('Login error:', error);
      }
  };