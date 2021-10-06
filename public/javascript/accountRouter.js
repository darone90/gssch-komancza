import Add from "../views/accounts/add.js";
import Edit from "../views/accounts/edit.js";
import Remove from "../views/accounts/remove.js";
import Invitation from "../views/accounts/invitation.js";

const router = async () => {
    const routes = [
        {path: '/accounts/', view : Invitation},
        {path: '/accounts/add', view: Add},
        {path: '/accounts/edit', view: Edit},
        {path: '/accounts/remove', view: Remove},
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
