/*
 * This script will attempt to remove unneccesary element, if they exist:
 * 1. The page header displaying school logo (we know what website it is, no need for this)
 * 2. The name block on the top of page
 */

function delete_BKeL_header() {
    let headerContainer = document.querySelector('#site-header .header-main')
    if (headerContainer) {
        headerContainer.style.marginTop = '60px';
        headerContainer.querySelector('.no-home').remove()
    }
}

function delete_heading_name_block() {
    let target = document.querySelector('#page #page-header')
    if (target) {
        target.remove()
    }
}
