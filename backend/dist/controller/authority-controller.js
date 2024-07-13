import { ShelterList } from "../models/Shelters.js";
export const saveShelters = async (req, res, next) => {
    const { locationArray } = req.body;
    try {
        console.log("reached save shelter in backend");
        console.log(locationArray);
        const shelterId = "one";
        const prevShelterList = await ShelterList.findOne({ id: shelterId });
        if (!prevShelterList) {
            const newShelterList = new ShelterList({ id: "one", shelters: locationArray });
            await newShelterList.save();
            return res.status(200).json({ message: "Shelters saved successfully! " });
        }
        else {
            prevShelterList.shelters = locationArray;
            await prevShelterList.save();
            //return res.status(200).json({ chats: user.chats });
            return res.status(200).json({ message: "Shelters saved successfully! " });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong " });
    }
};
export const getShelters = async (req, res, next) => {
    try {
        console.log("reached get shelter in backend");
        const shelterId = "one";
        const prevShelterList = await ShelterList.findOne({ id: shelterId });
        if (!prevShelterList) {
            return res.status(401).send("No schema registered OR Token malfunctioned");
        }
        console.log(prevShelterList.shelters);
        return res
            .status(200)
            .json({ message: "OK", shelters: prevShelterList.shelters });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Couldn't fetch data " });
    }
};
//# sourceMappingURL=authority-controller.js.map