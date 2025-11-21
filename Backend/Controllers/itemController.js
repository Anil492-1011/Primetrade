const Item = require('../Models/itemModel');

exports.createItem = async (req, res) => {
  try {
    const { title, description, status, priority, tags, dueDate } = req.body;

    const item = await Item.create({
      title,
      description,
      status,
      priority,
      tags,
      dueDate,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the item',
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const { search, status, priority } = req.query;
    const query = { owner: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: 'i' };

    const items = await Item.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching items',
    });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the item',
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updates = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the item',
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'Something went wrong while deleting the item',
    });
  }
};

