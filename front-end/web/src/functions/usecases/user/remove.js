import { render } from "react-dom";
import React from "react";
import Error from "../../../components/status/error";
import Clear from "../actions/sclear";
import Process from "../../../components/status/proccess";

export default async function Remove() {
    let dt = document.getElementById('media');
    if (/(https?:\/\/)?[a-z.-]+\.[a-z]{2,6}[/\w.-]*\/?/g.test(dt.value)) {
        const scrap = dt.value.replace('https://', '').replace('www.', '').replace('.com', '').replace('/users', '').replace('/in', '').replace('/c', '').replace('@', '').split('/');
        render(<Process />, document.getElementById("status"));
        const info = await fetch(`${window.env.BURL}/api/service/remove_media`, { method: "POST", headers: { 'Authorization': `Bearer ${document.cookie.replace("CID=", "")}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ username: scrap.slice(1).join('/'), site: scrap[0] }) })
            .then(res => { return res.json() })
            .then(data => { return data })
            .catch(err => { return err });
        if (!info.err) {
            Clear();
            return info.message;
        } else {
            render(<Error cont={JSON.stringify(info.message)} click={Clear} />, document.getElementById("status"));
            setTimeout(Clear, 3000);
        }
    } else { dt.focus() }
}