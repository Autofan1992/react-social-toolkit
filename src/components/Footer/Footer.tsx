import React from 'react'
import { Layout } from 'antd'

const { Footer: FooterANTD } = Layout

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <FooterANTD>
            <div className="container pt-3 pt-lg-4">
                <div className="d-flex justify-content-between gap-2">
                    <span>Developed by Mykola Gordiy</span>
                    <span>{year}</span>
                </div>
            </div>
        </FooterANTD>
    )
}