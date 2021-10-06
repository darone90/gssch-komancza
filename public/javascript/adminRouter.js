import Invitation from "../views/admin/invitation.js";
import Messages from "../views/admin/messages.js";
import Information from "../views/admin/information.js";
import Articles from "../views/admin/articles.js";
import Assortment from "../views/admin/assortmet.js";
import UserDataChange from "../views/admin/userchanges.js";


const router = async () => {
    const routes = [
        {path: '/admin', view : Invitation},
        {path: '/admin/messages', view: Messages},
        {path: '/admin/info', view: Information},
        {path: '/admin/articles', view: Articles},
        {path: '/admin/assortment', view: Assortment},
        {path: '/admin/userdatachange', view: UserDataChange},
    ];

    const isMatch = routes.map( route => {
        return {
            route,
            matched: location.pathname === route.path,
        };
    });

    let match = isMatch.find(match => match.matched);

    if(!match) {
        match = {
            route : routes[0],
            matched : true,
        };
    };

    const view = new match.route.view();
    document.querySelector('#app').innerHTML = await view.getHtml();
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router()
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
})
