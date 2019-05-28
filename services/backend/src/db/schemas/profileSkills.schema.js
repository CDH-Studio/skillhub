module.exports = (DataTypes) => ({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
    },
    isHighlySkilled: {
        type: DataTypes.BOOLEAN
    }
});
