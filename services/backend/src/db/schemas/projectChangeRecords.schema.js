module.exports = (DataTypes) => ({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
    },
    changedAttribute: {
        type: DataTypes.STRING
    },
    oldValue: {
        type: DataTypes.STRING
    },
    newValue: {
        type: DataTypes.STRING
    }
});
