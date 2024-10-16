let movePanelHolder: HTMLElement | null = document.querySelector('#movePanelHolder');
let functionHolder: HTMLElement | null = document.querySelector('#functionHolder');
let functionButtonGroupList: Element[] | null = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
let inputBox: HTMLElement | null = document.getElementById("moveinput");
let inputSendBtn: Element | null = document.querySelectorAll(".moveinputSendBtn")[0];
let msgholderBox: Element | null = document.querySelector(`#msgholder .fullBox .fullBox.msgholderBox`);
let homeHolderMsgBox: Element | null = document.querySelector(`#homeHolder .homeHolderMsgContentBox .homeHolderMsgBox.fullBox`);
let sessionHolderPmTaskBoxItems: Element[] | null = [...document.querySelectorAll(`.sessionHolderPmTaskBoxItem.whoisTouch2`)];
export const iiroseElements = {
    movePanelHolder,
    functionHolder,
    functionButtonGroupList,
    inputBox,
    inputSendBtn,
    msgholderBox,
    homeHolderMsgBox,
    sessionHolderPmTaskBoxItems
}


