import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Zarząd');
    }

    async getHtml() {
        return `
        <section class="management">
        <div class="titleManagement"><h1>Zarząd</h1></div>
        <div class='person'>
            <div class='imageBoss'></div>
            <div class='about'>
                <h1>Prezes zarządu</h1>
                <main>Parę słów o prezesie Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt atque vitae laboriosam ducimus hic repellendus vel minima! Minima provident aperiam explicabo dolore eaque ab magnam odit nesciunt. Corporis, ab laborum!</main>
            </div>
            <div class='bar'></div>
        </div>
        <div class='person'>
            <div class='imageBoss'></div>
            <div class='about'>
                <h1>Wiceprezes zarządu</h1>
                <main>Coś o wiceprezesie Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae repellat quod voluptatibus, dolorum ut quisquam dolor repudiandae consectetur, qu</main>
            </div>
            <div class='bar'></div>
        </div>
        <div class='person'>
            <div class='imageBoss'></div>
            <div class='about'>
                <h1>Członek Zarządu</h1>
                <main>Coś o  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, illum. Beatae excepturi eligendi aperiam iure consequuntur! Temporibus similique aliquam natus </main>
            </div>
            <div class='bar'></div>
        </div>
        <div class="titleDirectors"><h1>Rada nadzorcza</h1></div>
        <div class="boardDirectors">
            <div class="bosses">
                <div class="boss"><div class='imageBoss'></div><div class="about"><h1>Przewodniczący Rady Nadzorczej</h1><main>Coś o Przewodniczącym, amet consectetur adipisicing elit. Soluta asperiores ducimus dolorem nam dignissimos harum, vel vero voluptatem molestias quos repellendus, voluptas laborum aperiam reiciendis officiis architecto voluptates provident magnam.</main></div></div>
                <div class="boss"><div class='imageBoss'></div><div class="about"><h1>Zastępca Przewodniczącego</h1><main>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse eos cupiditate repellendus architecto illum rem! Suscipit earum odio nostrum in aliquid nemo dolores eum odit soluta natus, nulla assumenda? </main></div></div>
                <div class="boss"><div class='imageBoss'></div><div class="about"><h1>Sekretarz</h1><main>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel illum sequi harum mollitia reprehenderit hic vitae alias optio fugit. Velit maiores sed officiis provident in unde id, explicabo neque accusantium.</main></div></div>
            </div>
            <div class="restTeam">
                <div class='titleBar'><h1>Członkowie rady nadzorczej </h1></div>
                <div class="boss"><div class='imageBoss'></div><div class="about"><h1>Członek Rady Nadzorczej</h1><main>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus a sunt consequuntur aperiam eos, reiciendis nobis perspiciatis alias consectetur voluptatibus, tempora natus. Commodi perspiciatis amet dolore ratione sequi, quos facilis!</main></div></div>
                <div class="boss"><div class='imageBoss'></div><div class="about"><h1>Członek Rady Nadzorczej</h1><main>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis odio nostrum consectetur? Animi aliquam sunt numquam aperiam iste rerum quos quidem, ipsa recusandae impedit tenetur veniam, voluptatibus exercitationem iusto omnis?</main></div></div>
            </div>
        </div>
    </section>
    
    <div class="bossChangeBtn">
        <div class="moveBtn"><i class="fas fa-chevron-left"></i></div>
        <ul>
            <li>Zarząd</li>
            <li>Rada nadzorcza</li>
        </ul>
    </div>
        `;
    }
}