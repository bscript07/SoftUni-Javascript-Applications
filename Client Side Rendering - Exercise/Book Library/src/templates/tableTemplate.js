import { html } from "../../../node_modules/lit-html/lit-html.js";

export const tableTemplate = () => html`
                   <table>
                      <thead>
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                      </thead>
                   <tbody></tbody>
                    </table>`;