import { useState } from 'react';

export default initialValue => {
    const [tags, setTags] = useState(initialValue || []);
    const [tagCounter, setTagCounter] = useState(1);
    const [textCounter, setTextCounter] = useState(1);

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
        },
        addText: (tagIndex, text) => {
            const newTags = tags.map((item, index) => {
                if(index === tagIndex) {
                    return {
                        ...item,
                        texts: [
                            ...item.texts,
                            {
                                id: textCounter,
                                text: text
                            }
                        ]
                    }
                }
                return item;
            });
            setTags(newTags);
            const updatedCounter = textCounter + 1;
            setTextCounter(updatedCounter);
        },
        removeText: (tagIndex, textIndex) => {
            const newTags = tags.map((item, index) => {
                if(index === tagIndex) {
                    return {
                        ...item,
                        texts: [...item.texts.slice(0, textIndex), ...item.texts.slice(textIndex +1)]
                    }
                }
                return item;
            });
            setTags(newTags);
        }
    };
};
