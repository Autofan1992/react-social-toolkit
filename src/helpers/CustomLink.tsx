import { LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom'

const CustomNavLink = ({ children, to, ...props }: LinkProps) => {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })

    return <NavLink
        className={match ? 'active' : undefined}
        to={to}
        {...props}
    >
        {children}
    </NavLink>
}
export default CustomNavLink