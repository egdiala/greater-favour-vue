let store = {
  getters:{
      primary:'',
      junior:'',
      senior:'',
      themes:'',
      fees:''
  }
}
const menuMap = {
    mainmenu: {
      type: "title",
      menu: {
        label: "Main Menu"
      }
    },
    dashboard: {
      type: "item",
      menu: {
        label: "Dashboard",
        icon: "home",
        to: {
          name: "index"
        }
      }
    },
    subjects: {
      type: "tree",
      menu: {
        label: "Subjects",
        icon: "layout",
        children: {}
      }
    },
    primary: {
      label: "Primary",
      to: {
        name: "classes-primary",
        params: {
          classType: store.getters.primary,
          themes: store.getters.themes
        }
      }
    },
    junior: {
      label: "Junior Secondary",
      to: {
        name: "classes-junior",
        params: {
          classType: store.getters.junior,
          themes: store.getters.themes
        }
      }
    },
    senior: {
      label: "Senior Secondary",
      to: {
        name: "classes-senior",
        params: {
          classType: store.getters.senior,
          themes: store.getters.themes
        }
      }
    },
    users: {
      type: "tree",
      menu: {
        label: "Users",
        icon: "users",
        children: {}
      }
    },
    guardians:{
      label: "Guardians",
      to: {
        path: "/users/guardians"
      }
    },
    students:{
      label: "Students",
      to: {
        path: "/users/students"
      }
    },
    questions: {
      type: "tree",
      menu: {
        label: "Questions",
        icon: "help-circle",
        children: {}
      }
    },
    questionView: {
      label: "View",
      to: {
        name: "account-questions"
      }
    },
    questionUpload: {
      label: "Upload",
      to: {
        name: "questions-upload"
      }
    },
    questionReview: {
      label: "Review",
      to: {
        name: "questions-reviews"
      }
    },
    normalisation: {
      label: "Nomalisation",
      to: {
        name: "questions-normalisation"
      }
    },
    actions : {
      type: "title",
      menu: {
        label: "Action"
      }
    },
    payout: {
      type: "item",
      menu: {
        label: "Payout",
        icon: "layers",
        to: {
          name: "action-payout"
        }
      }
    },
    documentation: {
      type: "item",
      menu: {
        label: "Documentation",
        icon: "map",
        to: {
          name: "action-documentation"
        }
      }
    },
    verification:{
      type: 'title',
      menu:{
        label: 'Verification'
      }
    },
    verificationDocument: {
      type: "item",
      menu: {
        label: "Document",
        icon: "shield",
        to: {
          name: "action-document-verification"
        }
      }
    },
    verificationAttribute: {
      type: "item",
      menu: {
        label: "Attribute",
        icon: "user-plus",
        to: {
          name: "action-attribute-verification"
        }
      }
    },
    verificationInterest: {
      type: "item",
      menu: {
        label: "Interest",
        icon: "user-check",
        to: {
          name: "action-interest-verification"
        }
      }
    },
    operations:{
      type: "title",
      menu: {
        label: "Operations"
      }
    },
    cashout: {
      type: "item",
      menu: {
        label: "Cash Out",
        icon: "shopping-cart",
        to: {
          name: "cashout"
        }
      }
    },
    officers: {
      type: "tree",
      menu: {
        label: "Officers",
        icon: "user",
        children: {}
      }
    },
    officersManage: {
      label: "Manage",
      to: {
        name: "officers-manage"
      }
    },
    themes: {
      type: "tree",
      menu: {
        label: "Themes",
        icon: "grid",
        children: {}
      }
    },
    themesView: {
      label: "View",
      to: {
        name: "themes"
      }
    },
    settlement: {
      type: "tree",
      menu: {
        label: "Settlements",
        icon: "activity",
        children: {}
      }
    },
    settlementView: {
      label: "View",
      to: {
        name: "operations-settlement"
      }
    },
    account:{
      type: "title",
      menu: {
        label: "Account"
      }
    },
    documentUpload: {
      type: "item",
      menu: {
        label: "Document Upload",
        icon: "folder",
        to: {
          name: "account-document"
        }
      }
    },
    wallet: {
      type: "item",
      menu: {
        label: "Wallet",
        icon: "folder-plus",
        to: {
          name: "account-wallet"
        }
      }
    },
    fees: {
      type: "item",
      menu: {
        label: "Content Fees",
        icon: "gift",
        to: {
          name: "settings-fees"
        }
      }
    }
};

let menuSections = {
    mainmenu:{},
    actions:{},
    verification:{},
    operations: {},
    account:{}

}
export {
    menuMap,
    menuSections
}