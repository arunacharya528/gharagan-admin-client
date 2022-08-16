import React from "react"
import { Notification } from "./Notification"
import PageTitle from '../../components/Typography/PageTitle'
import { SiteAddress } from "./SiteAddress";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { useEffect } from "react";
import { getAll } from "../../adapters/siteData";
import { useState } from "react";
import { SiteInfo } from "./Info";


const Setting = () => {
    const [siteData, setSiteData] = useState({ loading: true, data: [] });

    useEffect(() => {
        getAll()
            .then(response => setSiteData({ loading: false, data: response.data }))
            .catch(error => console.log(error))
    }, [])


    const getByName = (name) => {
        return siteData.data.filter((item) => item.name === name)[0];
    }

    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Settings</span>
                </div>
            </PageTitle>
            {
                !siteData.loading ?
                    <div className="p-5 space-y-5 text-gray-700 dark:text-gray-400">
                        <Notification notification={getByName('notification')} />
                        <SiteInfo emailData={getByName('email')} contactData={getByName('contact')} />
                        <SiteAddress address={getByName('site_address')} />
                        <Logo logogSm={getByName('logo_url')} logoLg={getByName('lg_logo_url')} />
                        <SocialLinks socialLink={getByName('social_links')} />
                    </div>
                    : ''
            }


        </>
    );

}

export default Setting