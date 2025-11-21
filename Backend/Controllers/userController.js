const User = require('../Models/userSchema');

exports.createUser = async (req, res) => {
  try {

     const { name, email, image, BOD, ContactNumber } = req.body;

      if(!name || !email || !BOD || !ContactNumber){

        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
      }
      
      const user = await User.create({
        name,
        email,
        image,
        BOD,
        ContactNumber
      });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating user',
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Use authenticated user's id (sent by auth middleware)
    const userId = req.user?.id;

    const { name, image, BOD, ContactNumber } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, image, BOD, ContactNumber },
      { new: true }
    );

     
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating profile',
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching profile',
    });
  }
};

