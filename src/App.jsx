import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Box,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Coins,
  Gauge,
  MapPin,
  Radio,
  ScanLine,
  SmartphoneNfc,
  Terminal,
  Timer,
  Wallet,
  Wifi,
  Zap,
} from 'lucide-react'
import materializeLogo from './assets/materialize-logo.jpg'
import './App.css'

const products = [
  {
    name: 'M-ADAPT-01',
    type: 'Adaptive Pipe Interface',
    compatibility: ['CNC', '3D printer'],
    time: '2h 40m',
    material: 'Carbon-filled PA12',
    generationLabels: ['Generated from local geometry scan', 'Production-ready', 'Node compatible'],
    cost: '0.12 SOL',
    stablePrice: '5 USDC',
    networkFee: '0.00042 SOL fee',
    machineReward: '0.108 SOL',
    platformFee: '0.012 SOL',
    txHash: '5xQ9vB2hMZp7n4Tq3sK8rY1cL6uE9aP2mN7dF4jR8sV',
    nearest: 'CNC Axis-7',
    accent: 'from-amber-300 to-pink-500',
    shape: 'connector',
    variant: 'adaptive',
  },
  {
    name: 'ForgeLink C-9',
    type: 'High-Pressure Coupling',
    compatibility: ['Laser', 'CNC'],
    time: '1h 55m',
    material: 'Reinforced aluminum matrix',
    generationLabels: ['Generated pressure-fit variant', 'Production-ready', 'Infrastructure-grade'],
    cost: '0.09 SOL',
    stablePrice: '4 USDC',
    networkFee: '0.00039 SOL fee',
    machineReward: '0.081 SOL',
    platformFee: '0.009 SOL',
    txHash: '3nG8rK6pVc2Bq9zT5mW1sY7xHa4LwN8dE2fJ6uP9cR',
    nearest: 'LaserForm 2X',
    accent: 'from-pink-300 to-violet-500',
    shape: 'connector',
    variant: 'forge',
  },
  {
    name: 'NanoSeal V2',
    type: 'Rapid Repair Connector',
    compatibility: ['3D printer'],
    time: '3h 10m',
    material: 'Seal-grade polymer composite',
    generationLabels: ['Rapid local fabrication', 'Node compatible', 'Field repair ready'],
    cost: '0.07 SOL',
    stablePrice: '3 USDC',
    networkFee: '0.00031 SOL fee',
    machineReward: '0.063 SOL',
    platformFee: '0.007 SOL',
    txHash: '8uP2cR7xKa5Mqw1F9yL6hV3nTs4BzG8dN5jE2pQ6mX',
    nearest: 'PrintCell M4',
    accent: 'from-orange-300 to-amber-400',
    shape: 'connector',
    variant: 'nano',
  },
]

const machines = [
  {
    id: 'MTL-CNC-AX7',
    label: 'CNC',
    name: 'CNC Axis-7',
    status: 'online',
    availability: 'available',
    compatible: true,
    incompatibilityReason: '',
    load: '91%',
    position: { left: '18%', top: '28%' },
    discoveryPosition: { left: '74%', top: '27%' },
    nearest: '1.8 km',
    materialCompatibility: 'Carbon-filled PA12, aluminum',
    productionTime: '2h 40m',
  },
  {
    id: 'MTL-LSR-2X',
    label: 'Laser',
    name: 'LaserForm 2X',
    status: 'busy',
    availability: 'unsupported',
    compatible: false,
    incompatibilityReason: 'Unsupported material',
    load: '84%',
    position: { left: '68%', top: '22%' },
    discoveryPosition: { left: '80%', top: '72%' },
    nearest: '4.1 km',
    materialCompatibility: 'Sheet alloy only',
    productionTime: 'Geometry incompatibility',
  },
  {
    id: 'MTL-AM-M4',
    label: '3D printer',
    name: 'PrintCell M4',
    status: 'online',
    availability: 'available',
    compatible: true,
    incompatibilityReason: '',
    load: '76%',
    position: { left: '48%', top: '67%' },
    discoveryPosition: { left: '58%', top: '53%' },
    nearest: '2.7 km',
    materialCompatibility: 'Carbon-filled PA12',
    productionTime: '3h 05m',
  },
  {
    id: 'MTL-CNC-N9',
    label: 'CNC',
    name: 'ForgeNode N9',
    status: 'offline',
    availability: 'busy',
    compatible: false,
    incompatibilityReason: 'Tooling mismatch',
    load: '00%',
    position: { left: '82%', top: '72%' },
    discoveryPosition: { left: '32%', top: '74%' },
    nearest: '6.4 km',
    materialCompatibility: 'Steel, aluminum',
    productionTime: 'Queue reserved',
  },
]

const gcodeLines = [
  'G21 ; metric units',
  'G90 ; absolute positioning',
  'M104 S215 ; set tool temperature',
  'G1 X42.8 Y18.4 F1800',
  'G1 Z0.24 E0.0184',
  'G1 X86.2 Y44.1 E0.0931',
  'M106 S180 ; cooling channel',
  'G1 X108.6 Y72.7 E0.1420',
]

const transactionFeed = [
  ['Signature received', '0.4s'],
  ['Processed by leader', '0.8s'],
  ['Confirmed on Solana', '1.2s'],
]

const walletOptions = [
  {
    name: 'Solflare',
    address: '7MdK...9xQ2',
    note: 'Recommended for node authorization',
    detail: 'Fast settlement compatible',
    logo: 'solflare',
    primary: true,
  },
  {
    name: 'Phantom',
    address: '4VnA...2pLm',
    note: 'Operator signer',
    detail: 'Production route compatible',
    logo: 'phantom',
    primary: false,
  },
  {
    name: 'Backpack',
    address: '9TsR...7aKq',
    note: 'Execution signer',
    detail: 'Machine wallet compatible',
    logo: 'backpack',
    primary: false,
  },
]

const journey = [
  ['marketplace', 'Marketplace'],
  ['discovery', 'Discovery'],
  ['nfc', 'NFC'],
  ['execution', 'Execution'],
  ['proof', 'Proof-of-Make'],
  ['settlement', 'Settlement'],
]

function BrandMark({ className = '' }) {
  return (
    <span className={`brand-mark ${className}`}>
      <img src={materializeLogo} alt="Materialize cube logo" />
    </span>
  )
}

function WalletLogo({ wallet, className = '' }) {
  return (
    <span className={`wallet-logo wallet-logo-${wallet.logo} ${className}`}>
      <span />
    </span>
  )
}

function WalletModal({ onClose, onSelect }) {
  return (
    <motion.div
      className="wallet-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="wallet-modal"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5 border-b border-white/10 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200">Wallet router</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Authorize production wallet</h3>
          </div>
          <button type="button" className="wallet-close" onClick={onClose}>Close</button>
        </div>
        <div className="grid gap-3 p-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              type="button"
              className={`wallet-option ${wallet.primary ? 'primary' : ''}`}
              onClick={() => onSelect(wallet)}
            >
              <WalletLogo wallet={wallet} className="wallet-option-mark" />
              <span>
                <strong>{wallet.name}</strong>
                <em>{wallet.note}</em>
                <em>{wallet.detail}</em>
              </span>
              {wallet.primary ? <small>Preferred</small> : null}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function MachineNetworkBackground() {
  const nodes = [
    { x: '14%', y: '24%', delay: 0 },
    { x: '34%', y: '14%', delay: 0.4 },
    { x: '58%', y: '26%', delay: 0.8 },
    { x: '79%', y: '16%', delay: 1.1 },
    { x: '23%', y: '58%', delay: 1.4 },
    { x: '48%', y: '70%', delay: 0.7 },
    { x: '73%', y: '58%', delay: 0.2 },
    { x: '88%', y: '78%', delay: 1.7 },
  ]

  return (
    <div className="network-bg" aria-hidden="true">
      <div className="network-grid" />
      <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M14 24 L34 14 L58 26 L79 16 M34 14 L23 58 L48 70 L73 58 L88 78 M58 26 L73 58 M23 58 L14 24"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="0.18"
          strokeLinecap="round"
          pathLength="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.8, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#f8b84e" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#e8507f" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map((node) => (
        <motion.span
          key={`${node.x}-${node.y}`}
          className="machine-node"
          style={{ left: node.x, top: node.y }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function ProductVisual({ product }) {
  if (product.shape === 'connector') {
    return (
      <div className={`product-visual product-connector connector-variant-${product.variant ?? 'adaptive'}`}>
        <div className="connector-blueprint" />
        <div className="connector-telemetry connector-telemetry-a" />
        <div className="connector-telemetry connector-telemetry-b" />
        <div className="connector-cad" aria-hidden="true">
          <div className="connector-cap" />
          <div className="connector-cage">
            <span className="connector-strut connector-strut-left" />
            <span className="connector-strut connector-strut-mid-left" />
            <span className="connector-body" />
            <span className="connector-strut connector-strut-mid-right" />
            <span className="connector-strut connector-strut-right" />
          </div>
          <div className="connector-band" />
          <div className="connector-thread-stack">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="connector-base" />
        </div>
        <span className="scan-beam" />
      </div>
    )
  }

  return (
    <div className={`product-visual product-${product.shape}`}>
      <div className={`product-core bg-gradient-to-br ${product.accent}`} />
      <span className="scan-beam" />
    </div>
  )
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [selectedMachine, setSelectedMachine] = useState(machines[0])
  const [connected, setConnected] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const productionProgress = connected ? 72 : 38
  const proofTime = '2026-05-08 21:44 UTC'
  const routedMachine = selectedMachine.compatible ? selectedMachine : (machines.find((machine) => machine.compatible) ?? machines[0])
  const walletName = wallet ? `${wallet.name} Connected` : 'Connection Required'
  const walletAddress = wallet?.address ?? 'Signer Required'
  const routeStatus = wallet ? 'Machine Route Authorized' : 'Authorizing machine route...'
  const executionStatus = wallet ? 'SOL execution ready' : 'SOL execution standby'
  const activeJourney = journey[activeStep]
  const progressWidth = `${(activeStep / (journey.length - 1)) * 100}%`

  const goToStep = (index) => {
    setActiveStep(Math.min(Math.max(index, 0), journey.length - 1))
  }

  const goNext = () => goToStep(activeStep + 1)
  const goPrevious = () => goToStep(activeStep - 1)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (walletModalOpen) return
      if (event.key === 'ArrowRight') goToStep(activeStep + 1)
      if (event.key === 'ArrowLeft') goToStep(activeStep - 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeStep, walletModalOpen])

  const slideHeader = {
    marketplace: [
      'AI solution marketplace',
      'Select a generated adaptive manufacturing solution.',
      'Choose an AI-generated connector variant ready for decentralized production, with node compatibility, SOL execution pricing, and fabrication metadata.',
    ],
    discovery: [
      'Machine discovery',
      'Route the job through the production network.',
      'Select an available machine node and watch the route panel update with state, load, and distance.',
    ],
    nfc: [
      'NFC connection',
      'Authorize the selected node with a tap simulation.',
      'Bind the production packet to the machine through secure mobile NFC authorization.',
    ],
    execution: [
      'Production execution',
      'Stream the job into machine control.',
      'Monitor machine telemetry, G-code streaming, progress, and estimated completion.',
    ],
    proof: [
      'Proof-of-Make',
      'Verify completion with a production certificate.',
      'Inspect the machine ID, Solana-style job hash, timestamp, and verified node states.',
    ],
    settlement: [
      'SOL settlement',
      'Confirm reward routing and platform settlement.',
      'Visualize SOL payment routing, machine node reward, platform fee, and transaction confirmation.',
    ],
  }

  const renderSlide = () => {
    const [id] = activeJourney

    if (id === 'marketplace') {
      return (
        <div className="workflow-grid workflow-grid-wide">
          {products.map((product, index) => (
            <motion.button
              key={product.name}
              type="button"
              onClick={() => setSelectedProduct(product)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`surface product-card text-left ${selectedProduct.name === product.name ? 'selected-card' : ''}`}
            >
              <ProductVisual product={product} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{product.type}</p>
                  </div>
                  <Box className="h-5 w-5 text-amber-200" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.generationLabels.map((item) => (
                    <span key={item} className="rounded-md bg-white/8 px-2.5 py-1 text-xs text-violet-100 ring-1 ring-white/10">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 text-sm text-slate-300">
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-500" />{product.time}</span>
                  <span className="flex items-center gap-2"><Coins className="h-4 w-4 text-slate-500" />{product.cost}</span>
                  <span className="flex items-center gap-2"><CircleDollarSign className="h-4 w-4 text-slate-500" />{product.stablePrice}</span>
                  <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-slate-500" />{product.networkFee}</span>
                  <span className="flex items-center gap-2"><Box className="h-4 w-4 text-slate-500" />{product.compatibility.join(' + ')}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-500" />{product.nearest}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )
    }

    if (id === 'discovery') {
      const discoveryMachines = machines.slice(0, 3)
      const compatibleMachines = discoveryMachines.filter((machine) => machine.compatible)
      const activeDiscoveryMachine = compatibleMachines.find((machine) => machine.id === selectedMachine.id) ?? compatibleMachines[0]
      const routePath = `M22 46 L${parseInt(activeDiscoveryMachine.discoveryPosition.left, 10)} ${parseInt(activeDiscoveryMachine.discoveryPosition.top, 10)}`

      return (
        <div className="workflow-grid discovery-production-grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="surface component-inspection-panel">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Selected component</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{selectedProduct.name}</h3>
            <div className="component-inspection-visual">
              <ProductVisual product={selectedProduct} />
            </div>
            <div className="mt-5 grid gap-3">
              <div className="component-spec-row">
                <span>Material type</span>
                <strong>{selectedProduct.material ?? 'Production polymer'}</strong>
              </div>
              <div className="component-spec-row">
                <span>Estimated duration</span>
                <strong>{selectedProduct.time}</strong>
              </div>
              <div className="component-spec-row">
                <span>Manufacturing state</span>
                <strong className="text-amber-200">Production-ready</strong>
              </div>
            </div>
          </div>

          <div className="surface production-discovery-panel">
            <div className="production-map">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="discovery-lines">
                <motion.path
                  d="M22 46 L58 53 L74 27 M58 53 L80 72"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.36)"
                  strokeWidth="0.22"
                  strokeLinecap="round"
                  pathLength="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1 }}
                />
                <motion.path
                  key={activeDiscoveryMachine.id}
                  d={routePath}
                  fill="none"
                  stroke="url(#productionRouteGradient)"
                  strokeWidth="0.52"
                  strokeLinecap="round"
                  pathLength="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="productionRouteGradient" x1="0" x2="1">
                    <stop stopColor="#f8b84e" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="user-location-node" style={{ left: '22%', top: '46%' }}>
                <span />
                <strong>Operator location</strong>
                <em>Region: Belgrade mesh</em>
              </div>

              {discoveryMachines.map((machine) => (
                <button
                  key={machine.id}
                  type="button"
                  disabled={!machine.compatible}
                  className={`production-node ${machine.compatible ? machine.availability : 'incompatible'} ${activeDiscoveryMachine.id === machine.id ? 'active' : ''}`}
                  style={machine.discoveryPosition}
                  onClick={() => {
                    if (!machine.compatible) return
                    setSelectedMachine(machine)
                    setConnected(machine.availability === 'available')
                  }}
                >
                  <span className="node-dot" />
                  <strong>{machine.name}</strong>
                  <em>{machine.compatible ? machine.nearest : machine.incompatibilityReason}</em>
                </button>
              ))}
            </div>

            <div className="production-node-list">
              <div className="route-established">
                <Radio className="h-4 w-4" />
                Production route established
              </div>
              {discoveryMachines.map((machine) => (
                <button
                  key={machine.id}
                  type="button"
                  disabled={!machine.compatible}
                  className={`node-detail-card ${machine.compatible ? machine.availability : 'incompatible'} ${activeDiscoveryMachine.id === machine.id ? 'active' : ''}`}
                  onClick={() => {
                    if (!machine.compatible) return
                    setSelectedMachine(machine)
                    setConnected(machine.availability === 'available')
                  }}
                >
                  <div>
                    <strong>{machine.name}</strong>
                    <span>{machine.compatible ? `${machine.label} production node` : machine.incompatibilityReason}</span>
                  </div>
                  <div className="node-detail-grid">
                    <span><em>Distance</em>{machine.nearest}</span>
                    <span><em>Availability</em>{machine.compatible ? machine.availability : 'unsupported'}</span>
                    <span><em>Material</em>{machine.materialCompatibility}</span>
                    <span><em>ETA</em>{machine.productionTime}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (id === 'nfc') {
      return (
        <div className="workflow-grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="surface machine-auth-panel">
            <div className="machine-auth-scene">
              <div className="machine-frame">
                <div className="machine-head">
                  <span />
                  <strong>{routedMachine.name}</strong>
                </div>
                <div className="machine-window">
                  <div className="machine-toolpath" />
                  <div className="machine-spindle" />
                </div>
                <button type="button" className={`machine-nfc-tag ${connected ? 'authorized' : ''}`} onClick={() => setConnected(true)}>
                  <span className="nfc-pulse" />
                  <SmartphoneNfc className="relative z-10 h-6 w-6 text-amber-100" />
                  <strong>{connected ? 'Authorized' : 'NFC tag'}</strong>
                </button>
                <div className="machine-base">
                  <span>Node ID</span>
                  <strong>{routedMachine.id}</strong>
                </div>
              </div>
              <div className="machine-auth-copy">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Physical authorization point</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Tap the machine-mounted NFC tag</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  Authorize the selected production node before execution begins.
                </p>
              </div>
            </div>
          </div>
          <div className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-2"><BrandMark className="brand-mark-xs" /> Machine authorization</span>
                <Wifi className="h-4 w-4 text-amber-200" />
              </div>
              <div className="mt-10 grid place-items-center">
                <div className={`connect-orb ${connected ? 'connected' : ''}`}>
                  {connected ? <CheckCircle2 className="h-10 w-10 text-amber-200" /> : <ScanLine className="h-10 w-10 text-pink-200" />}
                </div>
              </div>
              <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Production node detected</p>
                <p className="mt-2 font-medium text-white">{routedMachine.name} ready</p>
                <p className="mt-1 text-sm text-amber-200">
                  {connected ? 'Execution channel established' : 'Tap NFC tag to authorize execution'}
                </p>
              </div>
              <div className="mt-4 grid gap-2">
                <div className={`phone-auth-row ${connected ? 'complete' : ''}`}>
                  <span>{connected ? 'Production node authenticated' : 'Machine route authorization required'}</span>
                </div>
                <div className={`phone-auth-row ${connected ? 'complete' : ''}`}>
                  <span>{connected ? 'SOL settlement ready' : 'Settlement channel standby'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (id === 'execution') {
      return (
        <div className="workflow-grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="dashboard-shell">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Production job</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{selectedProduct.name}</h3>
              </div>
              <Timer className="h-5 w-5 text-violet-200" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-slate-400">Production progress</span>
                <span className="font-medium text-white">{productionProgress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 via-pink-400 to-violet-400"
                  initial={{ width: '8%' }}
                  animate={{ width: `${productionProgress}%` }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                />
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="metric-card"><span>Spindle</span><strong>11.8k</strong></div>
                <div className="metric-card"><span>Thermal</span><strong>62C</strong></div>
                <div className="metric-card"><span>ETA</span><strong>18m</strong></div>
              </div>
            </div>
          </div>
          <div className="terminal-panel">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm text-slate-400">
              <Terminal className="h-4 w-4 text-violet-200" />
              G-code stream
            </div>
            <div className="space-y-2 p-4 font-mono text-xs text-violet-100">
              {gcodeLines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                >
                  <span className="text-slate-600">{String(index + 1).padStart(2, '0')}</span> {line}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (id === 'proof') {
      return (
        <div className="certificate workflow-certificate">
          <motion.div
            className="success-ring"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          >
            <BadgeCheck className="h-14 w-14 text-amber-200" />
          </motion.div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber-200"><BrandMark className="brand-mark-xs" /> Completion certificate</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{selectedProduct.name}</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="proof-field"><span>Job hash</span><strong>{selectedProduct.txHash}</strong></div>
              <div className="proof-field"><span>Machine ID</span><strong>{routedMachine.id}</strong></div>
              <div className="proof-field"><span>Timestamp</span><strong>{proofTime}</strong></div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="chain-confirm"><CheckCircle2 className="h-4 w-4" />Verified node</div>
              <div className="chain-confirm"><CheckCircle2 className="h-4 w-4" />Payment confirmed</div>
              <div className="chain-confirm"><CheckCircle2 className="h-4 w-4" />Machine rewarded</div>
              <div className="chain-confirm"><CheckCircle2 className="h-4 w-4" />Proof sealed</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="workflow-grid lg:grid-cols-[1fr_0.9fr]">
        <div className="settlement-flow surface p-6">
          <div className="wallet-node">
            <Wallet className="h-6 w-6 text-violet-200" />
            <span>{walletName}</span>
            <strong>{selectedProduct.cost}</strong>
            <em>{selectedProduct.stablePrice} quote</em>
            <div className="wallet-node-status">
              <span>{routeStatus}</span>
              <span>{executionStatus}</span>
              <span>Settlement confirmed</span>
            </div>
          </div>
          <motion.div
            className="payment-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="payment-card">
              <CircleDollarSign className="h-6 w-6 text-amber-200" />
              <span>Machine node reward</span>
              <strong>{selectedProduct.machineReward}</strong>
            </div>
            <div className="payment-card">
              <Gauge className="h-6 w-6 text-violet-200" />
              <span>Platform fee</span>
              <strong>{selectedProduct.platformFee}</strong>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Network fee</span>
              <strong className="font-mono text-sm text-amber-200">{selectedProduct.networkFee}</strong>
            </div>
            <div className="solana-fast-line" />
          </div>
        </div>
        <div className="confirmation-card">
          <CheckCircle2 className="h-9 w-9 text-amber-200" />
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-violet-200">Transaction confirmation</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Settlement complete</h3>
          <p className="mt-4 leading-7 text-slate-400">
            SOL transfer confirmed for {routedMachine.name}. Signature:
            <span className="mt-2 block font-mono text-xs text-violet-200">{selectedProduct.txHash}</span>
          </p>
          <div className="mt-6 space-y-2">
            {transactionFeed.map(([event, time], index) => (
              <motion.div
                key={event}
                className="tx-feed-row"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.14, duration: 0.35 }}
              >
                <span>{event}</span>
                <strong>{time}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="workflow-os min-h-screen overflow-hidden bg-[#050712] text-slate-100">
      <MachineNetworkBackground />
      <div className="workflow-shell">
        <nav className="workflow-topbar">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <span className="block text-lg font-semibold tracking-wide text-white">Materialize</span>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Production OS</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
              {wallet ? (
                <button type="button" className="nav-wallet connected" onClick={() => setWalletModalOpen(true)}>
                  <span className="wallet-status-dot" />
                  <WalletLogo wallet={wallet} className="nav-wallet-logo" />
                  <span>
                    <strong>{walletName}</strong>
                    <em>{walletAddress}</em>
                </span>
              </button>
            ) : (
              <button type="button" className="nav-wallet" onClick={() => setWalletModalOpen(true)}>
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </nav>

        <div className="workflow-progress">
          <div className="workflow-progress-track">
            <motion.div className="workflow-progress-fill" animate={{ width: progressWidth }} transition={{ duration: 0.45, ease: 'easeOut' }} />
          </div>
          {journey.map(([id, label], index) => (
            <button
              key={id}
              type="button"
              className={`workflow-step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'complete' : ''}`}
              onClick={() => goToStep(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {label}
            </button>
          ))}
        </div>

        <section className="workflow-stage">
          <div className="workflow-stage-header">
            <div>
              <p className="section-kicker">{slideHeader[activeJourney[0]][0]}</p>
              <h1 className="workflow-title">{slideHeader[activeJourney[0]][1]}</h1>
              <p className="section-copy">{slideHeader[activeJourney[0]][2]}</p>
            </div>
            <div className="wallet-pill">
              <span className={`wallet-status-dot ${wallet ? '' : 'idle'}`} />
              <Wallet className="h-4 w-4" />
              {walletName}
              <span>{walletAddress}</span>
              <span>{routeStatus}</span>
              <span>{executionStatus}</span>
            </div>
          </div>

          <div className="workflow-slide-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJourney[0]}
                className="workflow-slide"
                initial={{ opacity: 0, x: 44, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -44, filter: 'blur(8px)' }}
                transition={{ duration: 0.34, ease: 'easeOut' }}
              >
                {renderSlide()}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <div className="workflow-controls">
          <button type="button" className="workflow-control" onClick={goPrevious} disabled={activeStep === 0}>
            Previous
          </button>
          <div className="workflow-status">
            <span>{activeJourney[1]}</span>
            <strong>{String(activeStep + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')}</strong>
          </div>
          <button type="button" className="workflow-control primary" onClick={goNext} disabled={activeStep === journey.length - 1}>
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      {walletModalOpen ? (
        <WalletModal
          onClose={() => setWalletModalOpen(false)}
          onSelect={(selectedWallet) => {
            setWallet(selectedWallet)
            setWalletModalOpen(false)
          }}
        />
      ) : null}
    </main>
  )
}

export default App
