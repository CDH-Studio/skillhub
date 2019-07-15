module.exports = (DataTypes) => ({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    lastActive: {
        type: DataTypes.DATE
    },
    jiraKey: {
        type: DataTypes.STRING
    }
});
