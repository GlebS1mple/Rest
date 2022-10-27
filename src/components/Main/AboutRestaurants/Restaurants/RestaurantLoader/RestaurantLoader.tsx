import React from 'react';
import ContentLoader from "react-content-loader"

const MyLoader: React.FC = () => (
    <ContentLoader
        speed={2}
        width={500}
        height={250}
        viewBox="0 0 500 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="1" y="1" rx="0" ry="0" width="200" height="200" />
        <rect x="220" y="1" rx="0" ry="0" width="100" height="20" />
        <rect x="220" y="40" rx="0" ry="0" width="100" height="10" />
        <rect x="220" y="70" rx="0" ry="0" width="400" height="10" />
        <rect x="220" y="90" rx="0" ry="0" width="100" height="10" />
        <rect x="220" y="110" rx="0" ry="0" width="400" height="20" />
        <rect x="220" y="150" rx="0" ry="0" width="100" height="10" />
        <rect x="220" y="170" rx="0" ry="0" width="200" height="10" />
        <rect x="430" y="170" rx="0" ry="0" width="100" height="25" />
    </ContentLoader>
)
export default MyLoader;