const mockJson = require('../../mock_application.json');
const writeDataToJSONFile = require('../utils/writeFile');

function sanitizeKnackJsonData(data) {
    const { versions } = data;
    versions.forEach((item, index) => {
        const { objects, scenes } = item;
        versions[index].objects = removeObjectDuplicates(objects);
        versions[index].scenes = removeSceneDuplicates(scenes);
    });

    return data;
}

const removeSceneDuplicates = (data) => {
    let seen = new Set();
    let seenViews = new Set();
    let cleanedData = data.filter((item) => {
        if (seen.has(item.key + item.slug)) {
            return false;
        }
        seen.add(item.key + item.slug);
        item.views = item.views.filter((view) => {
            if (seenViews.has(view.key + view._id)) {
                return false;
            }
            seenViews.add(view.key + view._id);
            return true;
        });
        return true;
    });
    return cleanedData;
};

function removeObjectDuplicates(data) {
    let seen = new Set();
    let seenFields = new Set();
    let cleanedData = data.filter((item) => {
        if (seen.has(item.inflections.singular + item.identifier)) {
            return false;
        }
        seen.add(item.inflections.singular + item.identifier);
        item.fields = item.fields.filter((view) => {
            if (seenFields.has(view.key)) {
                return false;
            }
            seenFields.add(view.key);
            return true;
        });
        return true;
    });

    return cleanedData;
};


exports.sanitizeJsonSchema = async function (req, res, next) {
    try {
        const filepath = 'clean_application.json'
        const output = sanitizeKnackJsonData(mockJson);
        await writeDataToJSONFile(filepath, output);

        res.status(200).send({
            status: true,
            message: "Duplicate Prunned and !!",
            data: output
        })
    } catch (error) {
        next(error);
    }
}