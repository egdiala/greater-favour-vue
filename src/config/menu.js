
import { menuMap } from "./menuDictionary";

function menuBuilder(usermenu, menuSections){

    if(usermenu.length == 0){
        return menuSections
    }

    let menuItem = usermenu.pop()

    for(let i of menuItem){
            let levels = i.split('.')
            if(levels.length == 2){
                menuSections[levels[0]][levels[1]] = menuMap[levels[1]]
            }
            else{
                menuSections[levels[0]][levels[1]] = menuMap[levels[1]] 
                menuSections[levels[0]][levels[1]].menu.children[levels[2]] = menuMap[levels[2]]
            }
    }

    return menuBuilder(usermenu, menuSections)
}

let branch = []

function menuSegmentFormatter(segment){
    for(let i in segment){
      let node = segment[i]
      if(node.type == 'title'|| node.type == 'item'){
        branch.push(segment[i])
      }else{
        let subnode = node.menu.children
        
        subnode = Object.keys(subnode).map(n => subnode[n])
        branch.push(node)
      }
    }
    return branch
}

let userMenu = []
function menuParser(menutree){
  for(let segment in menutree){
    userMenu = []
    userMenu.push(menuSegmentFormatter(menutree[segment]))
  }
  return userMenu
}

export {
  menuBuilder,
  menuParser,
  menuSegmentFormatter
}