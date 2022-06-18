 /*
 * This script will attempt to sort courses in each section by name:
 * 1. Read each section content (<ul> of courses)
 * 2. Sort each section courses (<li>)
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


function sort_section_courses(sectMap) {
    function extractText(liElem) {
        let target = liElem.querySelector('.aalink.coursename')
        console.log(target)
        return target.innerText
                     .replace(/[\s\n]+/gm, ' ')
                     .trim()
    }

    for (let section of sectMap['sectionContent']) {
        const frag = document.createDocumentFragment()
        const items = section.querySelectorAll('li')
        const sortedItems = Array.from(items).sort(function(a, b){
            const aData = extractText(a), bData = extractText(b)
            return (aData < bData) ?
                -1 : (aData > bData) ?
                    1 : 0
        })

        for (let item of sortedItems) {
            frag.appendChild(item)
        }
        section.appendChild(frag)
    }
}
