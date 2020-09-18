import { CHANGE_DRAWER_CONTENT, IChangeDrawerContentAction, IDrawerContent } from "../types";

// -- Définition de l'action --
export function changeDrawerContent(content: IDrawerContent): IChangeDrawerContentAction {
  return {
    type: CHANGE_DRAWER_CONTENT,
    content: content
  }
}

//////////// Plus tard, dans mon composant
// dispatch(changeDrawerContent('contacts'))

