// Resource sizing controller

// Get resource sizing index page
exports.getIndex = (req, res) => {
  res.render('resources/index', { 
    title: 'VMware Resource Sizing Tool'
  });
};

// Calculate resources based on inputs
exports.calculateResources = (req, res) => {
  const { components } = req.body;
  
  // VMware best practices multipliers
  const overheadMultiplier = 1.2; // 20% overhead
  const haMultiplier = 1.5; // 50% for HA
  
  // Initialize totals
  let totalCPU = 0;
  let totalRAM = 0; // in GB
  let totalStorage = 0; // in GB
  
  // Process each component
  const componentDetails = [];
  const selectedComponents = [];
  
  if (components) {
    // Process each component type
    Object.keys(components).forEach(componentKey => {
      const component = components[componentKey];
      
      // Check if component is selected
      if (component.selected) {
        const numVMs = parseInt(component.vms) || 0;
        const cpuPerVM = parseInt(component.cpu) || 0;
        const ramPerVM = parseInt(component.ram) || 0; // in GB
        const storagePerVM = parseInt(component.storage) || 0; // in GB
        const deploymentType = component.deployment || 'standalone';
        
        // Skip if no VMs
        if (numVMs <= 0) return;
        
        // Calculate resources for this component
        const componentCPU = numVMs * cpuPerVM * overheadMultiplier * haMultiplier;
        const componentRAM = numVMs * ramPerVM * overheadMultiplier * haMultiplier;
        const componentStorage = numVMs * storagePerVM * overheadMultiplier;
        
        // Add to totals
        totalCPU += componentCPU;
        totalRAM += componentRAM;
        totalStorage += componentStorage;
        
        // Map component key to display name
        const componentNames = {
          'mysql': 'MySQL',
          'postgresql': 'PostgreSQL',
          'oracle': 'Oracle Database',
          'mongodb': 'MongoDB',
          'redis': 'Redis',
          'memcached': 'Memcached',
          'cassandra': 'Cassandra',
          'web': 'Web Server',
          'app': 'Application Server',
          'loadbalancer': 'Load Balancer',
          'desktop': 'Desktop',
          'highperf': 'High Performance'
        };
        
        const displayName = componentNames[componentKey] || componentKey;
        selectedComponents.push(displayName);
        
        // Format deployment type for display based on component type
        const formattedDeploymentType = formatDeploymentType(deploymentType, componentKey);
        
        // Store details for display
        componentDetails.push({
          type: displayName,
          numVMs,
          cpuPerVM,
          ramPerVM,
          storagePerVM,
          deploymentType: formattedDeploymentType,
          totalCPU: Math.ceil(componentCPU),
          totalRAM: Math.ceil(componentRAM),
          totalStorage: Math.ceil(componentStorage)
        });
      }
    });
  }
  
  // Round up to nearest whole number
  totalCPU = Math.ceil(totalCPU);
  totalRAM = Math.ceil(totalRAM);
  totalStorage = Math.ceil(totalStorage);
  
  const results = {
    totalCPU,
    totalRAM,
    totalStorage,
    componentDetails,
    selectedComponents,
    recommendations: getRecommendations(selectedComponents, componentDetails)
  };
  
  res.render('resources/results', { 
    title: 'Resource Calculation Results',
    results
  });
};

// Function to format deployment type for display
function formatDeploymentType(deploymentType, componentType) {
    // Component-specific deployment names
    const deploymentNames = {
        // Generic deployments
        'standalone': 'Standalone',
        
        // MySQL deployments
        'mysql': {
            'standalone': 'Standalone',
            'master-slave': 'Master-Slave (semi-sync)',
            'cluster': '3 nodes Galera (sync multi-master)'
        },
        
        // PostgreSQL deployments
        'postgresql': {
            'standalone': 'Standalone',
            'replication': 'Streaming (hot standby)',
            'patroni': 'Patroni (3 nodes, auto-failover)'
        },
        
        // Oracle deployments
        'oracle': {
            'standalone': 'Standalone',
            'rac': 'Oracle RAC',
            'dataguard': 'Data Guard'
        },
        
        // MongoDB deployments
        'mongodb': {
            'standalone': 'Standalone',
            'replica-set': 'Replica Set (3 nodes: 1 primary + 2 secondary)',
            'sharded-cluster': 'Sharded (3 shards, config server)'
        },
        
        // Redis deployments
        'redis': {
            'standalone': 'Standalone',
            'replication': 'Master-Slave (sentinel cho HA)',
            'redis-cluster': 'Redis Cluster (3+ masters, sharding, auto-rebalance)'
        },
        
        // Memcached deployments
        'memcached': {
            'standalone': 'Standalone',
            'cluster': 'Cluster'
        },
        
        // Cassandra deployments
        'cassandra': {
            'standalone': 'Standalone',
            'replication': 'Multi-DC (RF=3)',
            'cluster': 'Ring (5-10 nodes, gossip protocol)'
        }
    };
    
    // Return specific deployment name if available, otherwise generic name, otherwise the original type
    if (deploymentNames[componentType] && deploymentNames[componentType][deploymentType]) {
        return deploymentNames[componentType][deploymentType];
    }
    
    if (deploymentNames[deploymentType]) {
        return deploymentNames[deploymentType];
    }
    
    return deploymentType;
}

// Map display names back to component keys for the recommendations function
function getComponentKey(displayName) {
    const componentKeys = {
        'MySQL': 'mysql',
        'PostgreSQL': 'postgresql',
        'Oracle Database': 'oracle',
        'MongoDB': 'mongodb',
        'Redis': 'redis',
        'Memcached': 'memcached',
        'Cassandra': 'cassandra',
        'Web Server': 'web',
        'Application Server': 'app',
        'Load Balancer': 'loadbalancer',
        'Desktop': 'desktop',
        'High Performance': 'highperf'
    };
    
    return componentKeys[displayName] || displayName.toLowerCase();
}

// Get recommendations based on selected components
function getRecommendations(selectedComponents, componentDetails) {
  const allRecommendations = [];
  const addedRecommendations = new Set();
  
  // General recommendations for all components
  const generalRecommendations = [
    'Review resource allocation after initial deployment',
    'Monitor performance metrics regularly',
    'Adjust resources based on actual usage patterns',
    'Plan for future growth and scaling',
    'Implement proper backup and disaster recovery strategies'
  ];
  
  // Database-specific recommendations
  const databaseRecommendations = {
    'MySQL': [
      'Use InnoDB engine for ACID compliance and better performance',
      'Set innodb_buffer_pool_size to 70% of available RAM (e.g., 4GB RAM → 2.8GB)',
      'Configure max_connections=200 for typical web applications',
      'Use Docker with image: mysql:8.0, env: MYSQL_ROOT_PASSWORD=pass',
      'For high availability, implement Master-Slave replication with semi-sync',
      'For horizontal scaling, use 3-node Galera cluster for synchronous multi-master'
    ],
    'PostgreSQL': [
      'Set shared_buffers to 25% of available RAM (e.g., 1GB)',
      'Configure work_mem=4MB per operation for complex queries',
      'Set wal_buffers=16MB for write-ahead logging',
      'Use Docker with image: postgres:16, env: POSTGRES_PASSWORD=pass',
      'For replication, implement Streaming replication with hot standby',
      'For high availability, use Patroni with 3 nodes for auto-failover'
    ],
    'Oracle Database': [
      'Use dedicated storage for redo logs, data files, and archive logs',
      'Configure SGA and PGA memory areas appropriately',
      'Implement Oracle RAC for scalability and availability',
      'Use Oracle Data Guard for disaster recovery',
      'Monitor with Oracle Enterprise Manager'
    ],
    'MongoDB': [
      'Use WiredTiger engine for better performance',
      'Set cacheSizeGB to 50% of available RAM',
      'Use MongoDB 7.0+ for vector search capabilities',
      'Use Docker with image: mongo:7, env: MONGO_INITDB_ROOT_PASSWORD=pass',
      'For replication, implement Replica Set with 3 nodes (1 primary + 2 secondary)',
      'For horizontal scaling, use Sharded cluster with 3 shards and config server'
    ]
  };
  
  // Cache/NoSQL-specific recommendations
  const cacheRecommendations = {
    'Redis': [
      'Set maxmemory to 70% of available RAM (e.g., 2GB)',
      'Use maxmemory-policy=allkeys-lru for cache eviction',
      'Enable persistence with both RDB and AOF',
      'Use Docker with image: redis:7, cmd: redis-server --appendonly yes',
      'For high availability, implement Master-Slave with Sentinel',
      'For horizontal scaling, use Redis Cluster with 3+ masters for sharding'
    ],
    'Memcached': [
      'Allocate sufficient memory for cache storage',
      'Use consistent hashing for distributed caching',
      'Monitor cache hit ratios to optimize performance',
      'Implement cache warming strategies',
      'Plan for cache invalidation strategies'
    ],
    'Cassandra': [
      'Set heap_size to 8GB with proper young/old generation sizing',
      'Configure commitlog_total_space to 15% of disk space',
      'Use Docker with image: cassandra:4',
      'For replication, implement Multi-DC with RF=3',
      'For horizontal scaling, use Ring topology with 5-10 nodes and gossip protocol'
    ]
  };
  
  // Application/Web server recommendations
  const appRecommendations = {
    'Web Server': [
      'Use load balancing for high availability',
      'Enable compression for better network utilization',
      'Monitor CPU usage as it can spike during traffic',
      'Consider content distribution networks (CDNs)',
      'Implement web application firewalls (WAF)'
    ],
    'Application Server': [
      'Allocate sufficient heap memory for application',
      'Monitor thread usage and adjust accordingly',
      'Use application clustering for scalability',
      'Implement proper logging and monitoring',
      'Consider microservices architecture for better scalability'
    ],
    'Load Balancer': [
      'Deploy redundant load balancers for high availability',
      'Monitor connection counts and throughput',
      'Use SSL termination at the load balancer level',
      'Implement health checks for backend services',
      'Consider global load balancing for multi-site deployments'
    ]
  };
  
  // Desktop/High Performance recommendations
  const desktopRecommendations = {
    'Desktop': [
      'Use VMware Horizon for VDI deployment',
      'Implement linked clones to save storage',
      'Configure proper resource pools for different user types',
      'Use instant clones for faster provisioning',
      'Consider GPU acceleration for graphics-intensive workloads'
    ],
    'High Performance': [
      'Reserve 100% of CPU and memory resources',
      'Disable CPU and memory overcommit',
      'Use dedicated hardware resources',
      'Implement proper NUMA alignment',
      'Consider bare-metal deployment for maximum performance'
    ]
  };
  
  // Add recommendations for each selected component
  componentDetails.forEach(detail => {
    const componentKey = getComponentKey(detail.type);
    
    // Database recommendations
    if (databaseRecommendations[detail.type]) {
      databaseRecommendations[detail.type].forEach(rec => {
        if (!addedRecommendations.has(rec)) {
          allRecommendations.push(rec);
          addedRecommendations.add(rec);
        }
      });
    }
    
    // Cache/NoSQL recommendations
    if (cacheRecommendations[detail.type]) {
      cacheRecommendations[detail.type].forEach(rec => {
        if (!addedRecommendations.has(rec)) {
          allRecommendations.push(rec);
          addedRecommendations.add(rec);
        }
      });
    }
    
    // Application/Web server recommendations
    if (appRecommendations[detail.type]) {
      appRecommendations[detail.type].forEach(rec => {
        if (!addedRecommendations.has(rec)) {
          allRecommendations.push(rec);
          addedRecommendations.add(rec);
        }
      });
    }
    
    // Desktop/High Performance recommendations
    if (desktopRecommendations[detail.type]) {
      desktopRecommendations[detail.type].forEach(rec => {
        if (!addedRecommendations.has(rec)) {
          allRecommendations.push(rec);
          addedRecommendations.add(rec);
        }
      });
    }
    
    // Deployment-specific recommendations
    const originalDeploymentType = getOriginalDeploymentType(detail.deploymentType, componentKey);
    switch (originalDeploymentType) {
      case 'master-slave':
      case 'replication':
        if (!addedRecommendations.has('Configure automatic failover for replication setups')) {
          allRecommendations.push('Configure automatic failover for replication setups');
          addedRecommendations.add('Configure automatic failover for replication setups');
        }
        break;
      case 'cluster':
      case 'sharded-cluster':
      case 'redis-cluster':
        if (!addedRecommendations.has('Monitor cluster health and rebalance when necessary')) {
          allRecommendations.push('Monitor cluster health and rebalance when necessary');
          addedRecommendations.add('Monitor cluster health and rebalance when necessary');
        }
        break;
      case 'rac':
        if (!addedRecommendations.has('Configure Oracle RAC for optimal performance and availability')) {
          allRecommendations.push('Configure Oracle RAC for optimal performance and availability');
          addedRecommendations.add('Configure Oracle RAC for optimal performance and availability');
        }
        break;
    }
  });
  
  // Add general recommendations
  generalRecommendations.forEach(rec => {
    if (!addedRecommendations.has(rec)) {
      allRecommendations.push(rec);
      addedRecommendations.add(rec);
    }
  });
  
  return allRecommendations;
}

// Function to get original deployment type from formatted name
function getOriginalDeploymentType(formattedName, componentType) {
    // Component-specific reverse mapping
    const deploymentNames = {
        // MySQL reverse mappings
        'mysql': {
            'Standalone': 'standalone',
            'Master-Slave (semi-sync)': 'master-slave',
            '3 nodes Galera (sync multi-master)': 'cluster'
        },
        
        // PostgreSQL reverse mappings
        'postgresql': {
            'Standalone': 'standalone',
            'Streaming (hot standby)': 'replication',
            'Patroni (3 nodes, auto-failover)': 'patroni'
        },
        
        // Oracle reverse mappings
        'oracle': {
            'Standalone': 'standalone',
            'Oracle RAC': 'rac',
            'Data Guard': 'dataguard'
        },
        
        // MongoDB reverse mappings
        'mongodb': {
            'Standalone': 'standalone',
            'Replica Set (3 nodes: 1 primary + 2 secondary)': 'replica-set',
            'Sharded (3 shards, config server)': 'sharded-cluster'
        },
        
        // Redis reverse mappings
        'redis': {
            'Standalone': 'standalone',
            'Master-Slave (sentinel cho HA)': 'replication',
            'Redis Cluster (3+ masters, sharding, auto-rebalance)': 'redis-cluster'
        },
        
        // Memcached reverse mappings
        'memcached': {
            'Standalone': 'standalone',
            'Cluster': 'cluster'
        },
        
        // Cassandra reverse mappings
        'cassandra': {
            'Standalone': 'standalone',
            'Multi-DC (RF=3)': 'replication',
            'Ring (5-10 nodes, gossip protocol)': 'cluster'
        }
    };
    
    // Return specific reverse mapping if available
    if (componentType && deploymentNames[componentType] && deploymentNames[componentType][formattedName]) {
        return deploymentNames[componentType][formattedName];
    }
    
    // Fallback to generic mapping
    const genericNames = {
        'Standalone': 'standalone'
    };
    
    return genericNames[formattedName] || formattedName.toLowerCase().replace(' ', '-');
}
