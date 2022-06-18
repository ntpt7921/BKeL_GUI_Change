/*
 * This script will attempt to add section visibility tooggle, performing:
 * 1. Read section header (<li> elements) and its content (<ul> of courses)
 * 2. Add display='block' to each section content, also change bottom-margin=1.8em
 * 3. Add event for each section header so that clicking it toggles its content visibility
 * 4. It will by default show the first section and hide the rest
 */

function generate_section_objects() {
    let sectionHeaderList = document.getElementsByClassName('category-course')
    let dict = { sectionHeader: [],
                 sectionContent: [] }
    for (let sectionHeader of sectionHeaderList) {
        let sectionContent = sectionHeader.nextElementSibling
        dict['sectionHeader'].push(sectionHeader)
        dict['sectionContent'].push(sectionContent)
    }

    return dict
}

function modify_sections(sectionMap) {
    let sectionNumber = sectionMap['sectionHeader'].length
    for (let i = 0; i < sectionNumber; i++) {
        let sectionHeader = sectionMap['sectionHeader'][i]
        let sectionContent = sectionMap['sectionContent'][i]
        set_section_content_style(sectionContent)
        add_event_toggle_visibility(sectionHeader, sectionContent)
    }
}

function display_first_section_only(sectionMap) {
    let sectionNumber = sectionMap['sectionHeader'].length
    if (sectionNumber > 0) {
        // show the first section
        sectionMap['sectionContent'][0].style.display = 'block'
        // hide all other section
        for (let i = 1; i < sectionNumber; i++)
            sectionMap['sectionContent'][i].style.display = 'none'
    }
}

function set_section_content_style(sectionCont) {
    sectionCont.style.display = 'block'
    sectionCont.style.marginBottom = '1.8em'
}

function add_event_toggle_visibility(sectHeader, sectContent) {
    function toggle_visibility(sectionContent) {
        if (sectionContent.style.display === 'block')
            sectionContent.style.display = 'none'
        else
            sectionContent.style.display = 'block'
    }

    sectHeader.onclick = function () { toggle_visibility(sectContent) }
    sectHeader.onmouseover = function () { sectHeader.style.color = '#111111' }
    sectHeader.onmouseout = function () { sectHeader.style.color = '#545353' }
    sectHeader.style.cursor = 'pointer'
}



/*
 * The part below will refresh (rerun the command incase of content of section changes)
 * It uses MutationObserver (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
 * See also https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques
 */

(new MutationObserver(check)).observe(document.getElementById('region-main'),
                                      {childList: true, subtree: true}
                                     );

function check(changes, observer) {
    if (document.getElementById('page-container-2')) {
        // disconect since we also change the content, which will trigger observer again recursively
        observer.disconnect()

        // the magic happens here
        let sectList = generate_section_objects()
        modify_sections(sectList)
        display_first_section_only(sectList)
        sort_section_courses(sectList)

        // reconnect observer
        observer.observe(document.getElementById('region-main'),
                         {childList: true, subtree: true}
        );
    }
}
