import React, {useState, useRef, useEffect} from 'react';
import Modal from '../../ui-components/Modal';
import List from '../../ui-components/List';
import ListItem from '../../ui-components/ListItem';
import Title from '../../ui-components/Title';
import styled from 'styled-components';
import {removeParentTagFromText, highlightRange, getSafeRanges} from '../../Utility';

const TextContainer = styled.div`
    padding-right: 10px;
    height: 100%;
    overflow: auto;
`;

export default ({tags, selectText, removeText}) => {

    const [showModal, setShowModal] = useState(false);

    const textElement = useRef(null);

    const onSelection = e => {

        const sel = window.getSelection();
        const insideTextContainer = sel && sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('#text-container');

        if(insideTextContainer && sel && sel.toString().length > 0) {
            selectText(sel.getRangeAt(0), sel.toString());
        }
    }
    const onClearSelection = e => {
        const el = e.target;

        if(el.classList.contains('tag-list-item') || el.closest('li') && el.closest('li').classList.contains('tag-list-item')) {
            return;
        }

        const sel = window.getSelection();
        if(!sel || !sel.toString()) {
            selectText(null, '');
        }
    }

    const highlightText = (selRange, tagIndex, textIndex) => {
        const safeRanges = getSafeRanges(selRange);

        for (let i = 0; i < safeRanges.length; i++) {
            highlightRange(safeRanges[i], '#81d4fa', tagIndex, textIndex);
        }
    }
    const highlightAllTexts = (tgs) => {
        tgs.map((tag, i) => {
            tag.texts.map((text, j) => {
                highlightText(text.range, i, j);
            });
        });
    }
    const clearHighligts = (highlightElements, callback) => {
        removeParentTagFromText(highlightElements);
        callback();
    }

    const onClickHighlight = (e) => {
        // Do some check on target
        const target = e.target.classList.contains('highlight') ? e.target : e.target.parentNode.classList.contains('highlight') ? e.target.parentNode : null;
        if (target) {
            const tagIndex = parseInt(target.getAttribute('data-tag-index'), 10);
            const textIndex = parseInt(target.getAttribute('data-text-index'), 10);
            removeText(tagIndex, textIndex);
        }
    }

    // Run whenever update to keep tags updated
    useEffect(() => {
        textElement.current.addEventListener('click', onClickHighlight, true);

        // cleanup
        return () => {
            textElement.current.removeEventListener('click', onClickHighlight, true);
        }
    });

    // Runs only once
    useEffect(() => {
        // textElement.current.addEventListener('mouseup', onSelection);
        document.addEventListener('selectionchange', onSelection);
        document.addEventListener('mouseup', onClearSelection);
        document.addEventListener('touchend', onClearSelection);


        // cleanup
        return () => {
            // textElement.current.removeEventListener('mouseup', onSelection);
            document.removeEventListener('selectionchange', onSelection);
            document.removeEventListener('mouseup', onClearSelection);
            document.removeEventListener('touchend', onClearSelection);
        }
    }, []);

    // Runs every time tags changed
    useEffect(() => {
        clearHighligts(document.getElementsByClassName('highlight'), () => highlightAllTexts(tags));
    }, [tags]);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <TextContainer ref={textElement} id="text-container">
                <p>Lorem ipsum dolor sit <strong id="test">amet, consectetur adipiscing elit</strong>. Morbi a purus varius, bibendum lorem non, sodales est. Nunc pulvinar bibendum pulvinar. Curabitur aliquam eros a sagittis sagittis. Morbi ipsum augue, mollis id quam et, tempor varius nisl. Cras vestibulum velit in tortor ornare fringilla. Etiam arcu ligula, condimentum et rhoncus in, molestie id dolor. Etiam sagittis augue in ligula interdum, sit amet convallis metus placerat. Nunc egestas nisi nec arcu <strong>faucibus dictum</strong>. Duis porta mattis velit vitae dictum.</p>

                <p>Suspendisse malesuada elementum velit, quis cursus erat lacinia vel. Aenean vel massa in justo aliquam finibus ut vitae arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus in mollis ex, eget tempus felis. Donec non euismod metus, quis faucibus ante. Nullam viverra tempus dolor et egestas. Quisque id accumsan purus. Vestibulum fermentum scelerisque varius. Sed lacinia molestie pellentesque. Duis a tempor tortor, ac ultricies eros. Proin ligula ligula, semper eget laoreet et, ultrices vitae arcu. <strong>Pellentesque luctus ipsum in viverra faucibus. Etiam lobortis tellus nunc, suscipit lacinia sapien sodales eu</strong>. Suspendisse sit amet egestas diam. Mauris in blandit urna, nec tempus turpis. Morbi vestibulum felis vitae tortor maximus euismod.</p>

                <p>Praesent congue <strong>placerat mollis. Morbi non fringilla lacus. Nullam dignissim vel eros eu efficitur. Cras ornare lectus et quam tristique vehicula. Nulla laoreet finibus bibendum. Pellentesque tempus velit feugiat, imperdiet tortor vel, consequat sem. Duis nunc dui, rutrum ut nisi sit amet, lacinia facilisis magna. Vivamus dignissim ultricies mollis. Donec luctus, tortor ut varius aliquet, ex orci finibus est, vel sagittis neque felis sit amet eros. Aenean pulvinar urna eros</strong>, eget imperdiet ligula auctor in. Proin sit amet nunc risus. Nunc non lectus lacinia orci hendrerit finibus at aliquet risus. Vivamus a dictum mi. Quisque tincidunt mi vestibulum ipsum hendrerit, sed maximus sem semper.</p>

                <p>Donec et nibh posuere ligula porttitor ornare quis vel purus. Fusce ornare vel nisi sit amet hendrerit. Suspendisse gravida tincidunt tortor, a accumsan nibh consectetur vel. Suspendisse eget fermentum ipsum. Nam quis dignissim felis. Proin elementum dolor aliquet tempus feugiat. In at risus hendrerit, efficitur enim sed, molestie mi. Vestibulum pretium mattis neque ac tempus. Suspendisse ullamcorper cursus pulvinar.</p>

                <p>Quisque faucibus sapien eget orci feugiat posuere. Sed eu eleifend risus. Phasellus eu risus eu mauris eleifend aliquam. Pellentesque maximus cursus sapien. Maecenas bibendum, enim a rhoncus elementum, ante diam dictum dolor, sed consectetur eros urna in est. Integer sodales molestie urna eu mattis. Morbi iaculis orci pharetra magna ullamcorper, a tempor ligula suscipit. Maecenas blandit purus a dolor fermentum, vitae molestie nisl vestibulum. Proin et pretium velit, eget aliquam ligula. Vestibulum auctor vitae orci vel congue.</p>

                <p>Aenean aliquet eros vitae luctus ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec vel velit a metus vehicula dignissim a vel velit. Fusce nec tellus orci. Nullam eget felis dolor. Aliquam sed turpis nunc. Nunc in ante ac purus ultrices viverra. Ut quis sollicitudin quam, pulvinar aliquet purus. Donec elementum velit vitae purus lacinia sodales. Vivamus a ligula risus. Nulla elementum egestas massa, id mollis risus. Mauris id eleifend elit.</p>

                <p>Nulla ut vulputate leo. Aliquam sollicitudin tellus quam. Cras porta volutpat interdum. Vivamus ornare orci ut scelerisque elementum. Duis lobortis arcu commodo cursus convallis. Donec in sapien suscipit purus sollicitudin semper. Cras malesuada elit id diam scelerisque, nec luctus lectus convallis.</p>

                <p>Etiam faucibus justo leo, vitae bibendum libero pharetra at. Vestibulum tincidunt tempor ipsum ut vulputate. Fusce ullamcorper pellentesque lacus id viverra. Etiam at nisi id quam lacinia maximus. Cras viverra lacus vitae neque laoreet, a pellentesque turpis pellentesque. Proin non nunc euismod, tempor nunc nec, scelerisque sem. Integer quis diam a odio dapibus iaculis nec vitae neque. Sed pharetra, leo non efficitur venenatis, justo odio lacinia quam, vel commodo arcu augue quis massa. Sed eu dui iaculis, aliquet eros eu, dignissim libero.</p>

                <p>Sed sagittis ante eu augue venenatis faucibus. Etiam eu porta nunc, elementum sollicitudin tortor. Sed molestie ultricies sem. Cras ornare facilisis tempus. Mauris vehicula, justo sed lacinia cursus, nisl metus euismod erat, sed tempus tortor odio nec elit. Mauris interdum dolor dui, eu tempor leo ornare eget. Sed interdum venenatis felis, quis condimentum turpis vulputate quis. Nulla sed urna quis neque porta pulvinar. Phasellus cursus elit eu risus porttitor, id sodales augue maximus. Phasellus feugiat elit quis lacus sagittis pharetra.</p>

                <p>Nunc finibus suscipit nunc, a posuere nibh vulputate non. Praesent finibus, orci eu facilisis pretium, leo nulla tristique arcu, ac tincidunt mi magna vel eros. Sed sed est sed libero pretium rutrum. Morbi sollicitudin arcu id sem sollicitudin placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac lorem at lacus dictum auctor in sed nisl. Vestibulum accumsan nibh massa, vel scelerisque libero ullamcorper non.</p>

                <p>Curabitur rhoncus nibh eros, in dapibus elit sagittis ac. Duis dapibus consequat sem ut auctor. Maecenas sed lorem id lacus faucibus tristique et ac lectus. Nunc at nunc odio. Aenean aliquet est nec felis feugiat elementum. Morbi eget fermentum nisl. Morbi eleifend condimentum quam et tristique.</p>

                <p>Morbi eleifend tristique velit eu egestas. Duis id interdum ante. Morbi ullamcorper lectus et ornare porttitor. Fusce suscipit enim non faucibus auctor. Morbi vel dolor ac lectus eleifend dignissim. Nunc egestas odio pharetra augue semper laoreet. Pellentesque efficitur ultrices dolor.</p>

                <p>Duis sagittis dui ligula, id ultrices arcu commodo vel. Cras molestie dui quis nisi accumsan, sed porta leo feugiat. Donec orci tortor, varius non libero eu, ornare faucibus magna. Sed imperdiet felis ac interdum vehicula. Fusce vel enim sapien. Ut malesuada tempus augue, in congue urna mollis vel. Mauris consequat arcu vel ex aliquam mollis. Vestibulum vitae nibh non leo malesuada vulputate id nec odio. Quisque imperdiet, ante a ultrices congue, libero erat aliquet eros, ac aliquet elit nulla quis velit. Praesent fringilla placerat suscipit. Sed non ipsum vel justo tempor ultricies. Donec in quam a ligula aliquet blandit. Donec id pulvinar lectus.</p>

                <p>Vivamus sed eros eu nunc efficitur fringilla. Proin nec hendrerit est. Aenean sed metus at magna fermentum accumsan id vitae nunc. Praesent ornare quis metus nec vulputate. Mauris at risus facilisis, vestibulum purus vitae, varius orci. In egestas nisl sed magna viverra vehicula. Aliquam vitae finibus nulla, a vehicula lectus. Nam et massa dolor. Praesent vitae pellentesque lectus. Sed finibus accumsan odio at commodo. Vestibulum nunc sapien, ultricies at mi id, ultricies mollis nulla. Pellentesque mollis justo tellus, a ultricies libero dignissim eu. Etiam lobortis posuere massa nec tempor.</p>

                <p>Maecenas non posuere turpis, vitae rutrum libero. Aenean fringilla et risus non porta. In iaculis enim non ante blandit molestie. Mauris eu nisl a nisi aliquet mollis at et nisl. Suspendisse mattis tempor bibendum. Suspendisse ac pharetra lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc turpis eros, commodo vitae suscipit quis, condimentum eu leo. Morbi mollis vehicula porttitor. Nulla vitae congue nulla. Suspendisse vitae aliquam nisl, eget lobortis ligula. Praesent vitae turpis sit amet quam interdum varius in id eros. Nulla tincidunt nulla velit, a mattis ipsum posuere et.</p>
            </TextContainer>
        </React.Fragment>
    );
}
