import News from "../views/News.js";
import Shops from "../views/Shops.js";
import About from "../views/About.js";
import Activity from "../views/Activity.js";
import Management from "../views/Management.js";
import Contact from "../views/Contact.js";
import Bakery from "../views/Bakery.js";
import Announcements from "../views/Announcements.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router()
}

const router = async () => {
    const routes = [
        {path: '/', view: News},
        {path: '/shops', view: Shops},
        {path: '/bakery', view: Bakery},
        {path: '/about', view: About},
        {path: '/activity', view: Activity},
        {path: '/announcements', view: Announcements},
        {path: '/management', view: Management},
        {path: '/contact', view: Contact},
    ];

    const isMatch = routes.map(route=> {
        return {
            route,
            matched: location.pathname === route.path
        }
    });

    let match = isMatch.find(match=> match.matched);

    if(!match) {
        match = {
            route: routes[0],
            matched: true,
        };
    };

    const view = new match.route.view();
    document.querySelector('#app').innerHTML = await view.getHtml();

}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if(e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})