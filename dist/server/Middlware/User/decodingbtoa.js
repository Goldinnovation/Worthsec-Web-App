const decodingBtoa = (req, res, next) => {
    const encryptedQueryId = req.query?.Id;
    if (!encryptedQueryId || encryptedQueryId === undefined || encryptedQueryId === " ") {
        res.status(400).json({ message: "Bad Query: userId is required" });
        return;
    }
    const handleDecoding = (encryptedQueryId) => {
        if (typeof encryptedQueryId === "string") {
            const decodedId = atob(decodeURIComponent(encryptedQueryId));
            return decodedId;
        }
        else {
            console.log('Invalid query parameter: Id must be a string');
            res.status(200).json({ message: "Invalid query parameter: id must be a string" });
            return;
        }
    };
    const decodedId = handleDecoding(encryptedQueryId);
    req.decodedUserId = decodedId;
    next();
};
export default decodingBtoa;
