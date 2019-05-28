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
    primaryRole: {
        type: DataTypes.STRING
    },
    contactEmail: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    slackHandle: {
        type: DataTypes.STRING
    },
    rocketChatHandle: {
        type: DataTypes.STRING
    }
});
