// Global variables
let scenes = {};
let renderers = {};
let cameras = {};
let controls = {};
let products = {};
let modalScene, modalRenderer, modalCamera, modalControls;

// Product data
const productData = {
    bowl: {
        title: "Oak Bowl",
        description: "A beautifully handcrafted oak bowl, perfect for serving salads, fruits, or as a decorative piece. Each bowl showcases the natural grain patterns unique to oak wood, making every piece one-of-a-kind.",
        dimensions: ["Diameter: 25cm", "Height: 8cm", "Weight: 450g"],
        features: [
            "100% sustainably sourced oak wood",
            "Food-safe natural finish",
            "Hand-sanded smooth surface",
            "Unique grain pattern",
            "Easy to clean and maintain"
        ]
    },
    "cutting-board": {
        title: "Cutting Board",
        description: "Premium oak cutting board designed for both functionality and aesthetics. The dense oak wood provides excellent durability while being gentle on knife blades. Perfect for any kitchen.",
        dimensions: ["Length: 40cm", "Width: 25cm", "Thickness: 3cm", "Weight: 1.2kg"],
        features: [
            "Dense oak wood construction",
            "Knife-friendly surface",
            "Natural antimicrobial properties",
            "Reversible design",
            "Hanging loop for storage"
        ]
    },
    vase: {
        title: "Oak Vase",
        description: "An elegant decorative vase that celebrates the natural beauty of oak. This sophisticated piece adds warmth and organic charm to any space, whether holding fresh flowers or standing alone as art.",
        dimensions: ["Diameter: 15cm", "Height: 30cm", "Weight: 800g"],
        features: [
            "Artistic grain showcase",
            "Water-resistant interior coating",
            "Stable weighted base",
            "Smooth polished finish",
            "Perfect for dried or fresh arrangements"
        ]
    },
    tray: {
        title: "Serving Tray",
        description: "Sophisticated serving tray perfect for entertaining guests or everyday use. The raised edges and comfortable handles make it both practical and beautiful, ideal for serving drinks, appetizers, or breakfast in bed.",
        dimensions: ["Length: 45cm", "Width: 30cm", "Height: 5cm", "Weight: 1kg"],
        features: [
            "Ergonomic side handles",
            "Raised edges for stability",
            "Non-slip base padding",
            "Multi-purpose design",
            "Elegant wood grain display"
        ]
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProductScenes();
    initializeModal();
    initializeContactForm();
    initializeScrollAnimations();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Initialize 3D product scenes
function initializeProductScenes() {
    const productContainers = document.querySelectorAll('.product-3d');
    
    productContainers.forEach(container => {
        const productType = container.id.replace('-3d', '');
        createProductScene(container, productType);
    });
}

// Create individual 3D scene for each product
function createProductScene(container, productType) {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Create product geometry based on type
    let geometry, material, mesh;
    
    // Oak wood texture (simulated with color and normal mapping)
    const oakTexture = createOakTexture();
    
    material = new THREE.MeshPhongMaterial({
        color: 0xD2B48C,
        map: oakTexture,
        shininess: 30,
        transparent: false
    });
    
    switch(productType) {
        case 'bowl':
            geometry = createBowlGeometry();
            break;
        case 'cutting-board':
            geometry = createCuttingBoardGeometry();
            break;
        case 'vase':
            geometry = createVaseGeometry();
            break;
        case 'tray':
            geometry = createTrayGeometry();
            break;
        default:
            geometry = new THREE.BoxGeometry(2, 2, 2);
    }
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
    // Position camera
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    
    // Store references
    scenes[productType] = scene;
    renderers[productType] = renderer;
    cameras[productType] = camera;
    products[productType] = mesh;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Slow rotation
        mesh.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Add hover interaction
    container.addEventListener('mouseenter', function() {
        container.style.transform = 'scale(1.05)';
        mesh.rotation.speed = 0.02;
    });
    
    container.addEventListener('mouseleave', function() {
        container.style.transform = 'scale(1)';
        mesh.rotation.speed = 0.005;
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (container.offsetWidth > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

// Create oak wood texture
function createOakTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create wood grain pattern
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#E5D4B1');
    gradient.addColorStop(0.3, '#D2B48C');
    gradient.addColorStop(0.6, '#CD853F');
    gradient.addColorStop(1, '#A0826D');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add grain lines
    ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        const y = (canvas.height / 20) * i + Math.random() * 10;
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(canvas.width / 2, y + Math.random() * 20 - 10, canvas.width, y);
        ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    
    return texture;
}

// Geometry creation functions
function createBowlGeometry() {
    const geometry = new THREE.LatheGeometry([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.5, 0),
        new THREE.Vector2(1.8, 0.2),
        new THREE.Vector2(2.0, 0.8),
        new THREE.Vector2(1.9, 1.2),
        new THREE.Vector2(1.7, 1.4),
        new THREE.Vector2(1.2, 1.5),
        new THREE.Vector2(0.3, 1.5)
    ], 32);
    
    return geometry;
}

function createCuttingBoardGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-2, -1.5);
    shape.lineTo(2, -1.5);
    shape.quadraticCurveTo(2.2, -1.5, 2.2, -1.3);
    shape.lineTo(2.2, 1.3);
    shape.quadraticCurveTo(2.2, 1.5, 2, 1.5);
    shape.lineTo(-2, 1.5);
    shape.quadraticCurveTo(-2.2, 1.5, -2.2, 1.3);
    shape.lineTo(-2.2, -1.3);
    shape.quadraticCurveTo(-2.2, -1.5, -2, -1.5);
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 8,
        bevelSize: 0.05,
        bevelThickness: 0.05
    });
    
    return geometry;
}

function createVaseGeometry() {
    const geometry = new THREE.LatheGeometry([
        new THREE.Vector2(0.3, 0),
        new THREE.Vector2(0.8, 0.2),
        new THREE.Vector2(1.0, 1.0),
        new THREE.Vector2(0.9, 2.0),
        new THREE.Vector2(0.7, 2.8),
        new THREE.Vector2(0.6, 3.0),
        new THREE.Vector2(0.8, 3.2),
        new THREE.Vector2(0.9, 3.4)
    ], 32);
    
    return geometry;
}

function createTrayGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-2.5, -1.8);
    shape.lineTo(2.5, -1.8);
    shape.quadraticCurveTo(2.7, -1.8, 2.7, -1.6);
    shape.lineTo(2.7, 1.6);
    shape.quadraticCurveTo(2.7, 1.8, 2.5, 1.8);
    shape.lineTo(-2.5, 1.8);
    shape.quadraticCurveTo(-2.7, 1.8, -2.7, 1.6);
    shape.lineTo(-2.7, -1.6);
    shape.quadraticCurveTo(-2.7, -1.8, -2.5, -1.8);
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.4,
        bevelEnabled: true,
        bevelSegments: 8,
        bevelSize: 0.1,
        bevelThickness: 0.05
    });
    
    return geometry;
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    const viewProductBtns = document.querySelectorAll('.view-product-btn');
    
    viewProductBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productType = this.getAttribute('data-product');
            openProductModal(productType);
        });
    });
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openProductModal(productType) {
    const modal = document.getElementById('product-modal');
    const modalContainer = document.getElementById('modal-3d-container');
    const data = productData[productType];
    
    // Update modal content
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-description').textContent = data.description;
    
    // Update dimensions
    const dimensionsContainer = document.getElementById('modal-dimensions');
    dimensionsContainer.innerHTML = '';
    data.dimensions.forEach(dim => {
        const span = document.createElement('span');
        span.textContent = dim;
        dimensionsContainer.appendChild(span);
    });
    
    // Update features
    const featuresList = document.getElementById('modal-features-list');
    featuresList.innerHTML = '';
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Create 3D scene for modal
    createModalScene(modalContainer, productType);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function createModalScene(container, productType) {
    // Clear previous scene
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Scene setup
    modalScene = new THREE.Scene();
    modalCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    modalRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    modalRenderer.setSize(container.offsetWidth, container.offsetHeight);
    modalRenderer.setClearColor(0x000000, 0);
    modalRenderer.shadowMap.enabled = true;
    modalRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(modalRenderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    modalScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    modalScene.add(directionalLight);
    
    // Create product
    let geometry, material, mesh;
    const oakTexture = createOakTexture();
    
    material = new THREE.MeshPhongMaterial({
        color: 0xD2B48C,
        map: oakTexture,
        shininess: 30
    });
    
    switch(productType) {
        case 'bowl':
            geometry = createBowlGeometry();
            break;
        case 'cutting-board':
            geometry = createCuttingBoardGeometry();
            break;
        case 'vase':
            geometry = createVaseGeometry();
            break;
        case 'tray':
            geometry = createTrayGeometry();
            break;
    }
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    modalScene.add(mesh);
    
    // Controls
    modalControls = new THREE.OrbitControls(modalCamera, modalRenderer.domElement);
    modalControls.enableDamping = true;
    modalControls.dampingFactor = 0.05;
    modalControls.enableZoom = true;
    modalControls.enablePan = false;
    
    // Position camera
    modalCamera.position.set(0, 0, 5);
    modalCamera.lookAt(0, 0, 0);
    
    // Animation loop
    function animate() {
        if (modalRenderer && modalScene && modalCamera) {
            requestAnimationFrame(animate);
            modalControls.update();
            modalRenderer.render(modalScene, modalCamera);
        }
    }
    animate();
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Cleanup 3D scene
    if (modalRenderer) {
        modalRenderer.dispose();
        modalRenderer = null;
    }
    if (modalControls) {
        modalControls.dispose();
        modalControls = null;
    }
}

// Contact form functionality
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#28a745';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .stat, .about-text').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Handle window resize for all 3D scenes
window.addEventListener('resize', function() {
    // Resize product scenes
    Object.keys(renderers).forEach(key => {
        const container = document.getElementById(key + '-3d');
        if (container && container.offsetWidth > 0) {
            cameras[key].aspect = container.offsetWidth / container.offsetHeight;
            cameras[key].updateProjectionMatrix();
            renderers[key].setSize(container.offsetWidth, container.offsetHeight);
        }
    });
    
    // Resize modal scene
    if (modalRenderer && modalCamera) {
        const container = document.getElementById('modal-3d-container');
        if (container && container.offsetWidth > 0) {
            modalCamera.aspect = container.offsetWidth / container.offsetHeight;
            modalCamera.updateProjectionMatrix();
            modalRenderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    }
});

// Performance optimization: Pause animations when not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations
        Object.keys(products).forEach(key => {
            if (products[key]) {
                products[key].rotation.paused = true;
            }
        });
    } else {
        // Resume animations
        Object.keys(products).forEach(key => {
            if (products[key]) {
                products[key].rotation.paused = false;
            }
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});