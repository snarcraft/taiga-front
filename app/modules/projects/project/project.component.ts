/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: project.controller.coffee
 */

import { AppMetaService } from "../../services/app-meta.service";
import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { TranslateService } from "@ngx-translate/core"
import { Store } from "@ngrx/store"
import { IState } from "../../../ts/app.store"

@Component({
    selector: "tg-project-detail",
    template: require("./project.jade")()
})
export class ProjectDetail implements OnInit {
    user:any;
    project:any;

    constructor(private appMeta: AppMetaService,
                private translate: TranslateService,
                private store: Store<IState>,
                private route: ActivatedRoute) {
        this.user = this.store.select((state) => state.getIn(['global', 'user']));
        this.project = this.store.select((state) => state.get('current-project'));

        this.project.subscribe((project) => {
            let title = this.translate.instant("PROJECT.PAGE_TITLE", {projectName: project.get('name')});
            this.appMeta.setTitle(title);
            this.appMeta.setDescription(project.get("description"));
        });
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.store.dispatch({
                type: "FETCH_CURRENT_PROJECT",
                payload: params['slug'],
            })
        })
    }
}
