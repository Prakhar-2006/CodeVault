#!/bin/bash
# =================================================
#   Fancy Cross-Platform Digital Clock
# #opensourse #hactoberfest2025 #contribution #simplecode
# =================================================

clear_screen() {
    case "$OSTYPE" in
        linux*|darwin*) clear ;;
        cygwin*|msys*)  cls ;;
        *) clear ;;
    esac
}
draw_border() {
    echo -e "\e[1;34m╔══════════════════════════════════════╗\e[0m"
    echo -e "\e[1;34m║\e[0m         \e[1;36mFANCY DIGITAL CLOCK\e[0m          \e[1;34m║\e[0m"
    echo -e "\e[1;34m╚══════════════════════════════════════╝\e[0m"
}
show_time() {
    local TIME=$(date +"%H:%M:%S")
    local DATE=$(date +"%A, %d %B %Y")
    local ZONE=$(date +"%Z %z")

    echo
    echo -e "     🕒  \e[1;33m$TIME\e[0m"
    echo -e "     📅  \e[1;32m$DATE\e[0m"
    echo -e "     🌍  \e[1;35m$ZONE\e[0m"
    echo
}
blink_colon() {
    local sec=$(date +"%S")
    if (( sec % 2 == 0 )); then
        echo -n ":"
    else
        echo -n " "
    fi
}
footer_anim() {
    local frames=('|' '/' '-' '\\')
    local i=$(( $(date +%S) % 4 ))
    echo -e "\e[1;34mUpdating ${frames[$i]}\e[0m"
}
while true
do
    clear_screen
    draw_border
    show_time
    footer_anim
    sleep 1
done
