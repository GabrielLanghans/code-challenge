import { useState } from 'react';

export default initialValue => {
    const [tags, setTags] = useState(initialValue);
    const [tagCounter, setTagCounter] = useState(1);    

    return {
        tags,
        addTag: name => {
            const newTag = {
                id: tagCounter,
                name: name || `tag ${tagCounter}`,
                texts: []
            }
            setTags([...tags, newTag]);
            const updatedCounter = tagCounter + 1;
            setTagCounter(updatedCounter);
        },
        removeTag: tagIndex => {
            // setTags([...tags.slice(0, tagIndex), ...tags.slice(tagIndex + 1)]);
            setTags(tags.filter((item, index) => index !== tagIndex));
        }
    };
};
