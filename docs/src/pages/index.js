import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">🏄‍♂️ SurfGeofence</h1>
        <p className="hero__subtitle">
          Plataforma IoT de monitorización y geofencing para tablas de surf
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Ver Documentación 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Inicio | ${siteConfig.title}`}
      description="Documentación oficial de la arquitectura y despliegue de SurfGeofence.">
      <HomepageHeader />
      <main>
        {/* Puedes mantener los features por defecto o borrarlos si no los necesitas */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}