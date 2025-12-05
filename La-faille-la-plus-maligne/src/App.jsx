import React, { useState, useEffect } from 'react';
import { Shield, Lock, Unlock, AlertTriangle, CheckCircle, Award, Users, BookOpen, Terminal, Eye, EyeOff, Trophy, Target, Zap, Skull, Key, Bug, Sparkles, Siren, PartyPopper } from 'lucide-react';

const HIKORNPlatform = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showVulnerability, setShowVulnerability] = useState(false);
  const [exploitAttempted, setExploitAttempted] = useState(false);
  const [points, setPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [storyStage, setStoryStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const [terminalCommands, setTerminalCommands] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');

  // 🎭 L'histoire du Village HIKORN
  const storyNarration = [
    {
      stage: 0,
      title: "🏰 Bienvenue au Village HIKORN",
      text: "Vous entrez dans le village numérique résistant. Tout semble sécurisé... ou pas ? 🤔",
      emoji: "🏰"
    },
    {
      stage: 1,
      title: "🔍 Mission Détective",
      text: "Hmm... Ce village a un secret. Quelqu'un a laissé une porte déverrouillée. Pouvez-vous la trouver ?",
      emoji: "🔍"
    },
    {
      stage: 2,
      title: "🎉 Bravo, Hacker !",
      text: "BINGO ! Vous avez trouvé la faille ! Vous êtes maintenant un hacker éthique certifié du Village HIKORN ! 🎓",
      emoji: "🎉"
    }
  ];

  const users = [
    { id: 1, username: 'student', password: 'pass123', role: 'student', points: 50, avatar: '👨‍🎓', quote: "J'apprends le code !" },
    { id: 2, username: 'teacher', password: 'teacher123', role: 'teacher', points: 150, avatar: '👩‍🏫', quote: "Enseigner, c'est apprendre deux fois." },
    { id: 3, username: 'admin', password: 'admin123', role: 'admin', points: 500, avatar: '👨‍💼', secretData: 'FLAG{broken_access_control_discovered}', quote: "Avec un grand pouvoir vient une grande responsabilité.", secretVault: "🔐 Coffre-fort secret : Le trésor de HIKORN est protégé... ou pas ?" }
  ];

  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('userId', user.id);
      setPoints(user.points);
      setStoryStage(1);
      return true;
    }
    return false;
  };

  const getUserData = (userId) => {
    return users.find(u => u.id === parseInt(userId));
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && currentUser && parseInt(storedUserId) !== currentUser.id) {
      setExploitAttempted(true);
      setStoryStage(2);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      if (!completedChallenges.includes('access_control')) {
        setCompletedChallenges([...completedChallenges, 'access_control']);
        setPoints(points + 100);
      }
    }
  }, [currentUser]);

  const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showHint, setShowHint] = useState(false);

    const onLogin = () => {
      if (handleLogin(username, password)) {
        setError('');
        setActiveTab('dashboard');
      } else {
        setError('❌ Oups ! Mauvais mot de passe !');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Étoiles animées */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>

        <div className="max-w-md w-full z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <Shield className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                🏰 Village HIKORN
              </h1>
              <p className="text-purple-200 text-lg mb-4">Le Village Numérique Résistant</p>
              <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-3 mb-4">
                <p className="text-yellow-300 text-sm font-semibold">
                  🎮 Mission : Trouvez la faille de sécurité cachée !
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="👤 Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="🔑 Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onLogin()}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
                />
              </div>
              {error && (
                <div className="bg-red-500/20 border border-red-400 rounded-lg p-3 animate-shake">
                  <p className="text-red-300 text-sm text-center">{error}</p>
                </div>
              )}
              <button
                onClick={onLogin}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-purple-900 font-bold py-3 rounded-lg transition-all transform hover:scale-105 text-lg shadow-lg"
              >
                🚀 Entrer dans le Village
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-blue-300 hover:text-blue-200 text-sm underline flex items-center mx-auto"
              >
                {showHint ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showHint ? 'Masquer' : 'Besoin d\'aide ?'}
              </button>
              
              {showHint && (
                <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30 animate-fade-in">
                  <p className="text-sm text-blue-200 mb-3 font-semibold">🎯 Comptes de test :</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white/10 p-2 rounded">
                      <span className="text-xs text-blue-100">👨‍🎓 Élève</span>
                      <code className="text-xs text-yellow-300">student / pass123</code>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 p-2 rounded">
                      <span className="text-xs text-blue-100">👩‍🏫 Prof</span>
                      <code className="text-xs text-yellow-300">teacher / teacher123</code>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 p-2 rounded">
                      <span className="text-xs text-blue-100">👨‍💼 Admin</span>
                      <code className="text-xs text-yellow-300">admin / admin123</code>
                    </div>
                  </div>
                  <p className="text-xs text-blue-200 mt-3 italic">
                    💡 Astuce : Commencez par "student" et cherchez une faille...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardScreen = () => {
    const [inspectMode, setInspectMode] = useState(false);
    const [userIdInput, setUserIdInput] = useState('');
    const [viewedUser, setViewedUser] = useState(null);
    const [showHackerTerminal, setShowHackerTerminal] = useState(false);

    const tryExploit = () => {
      const userData = getUserData(userIdInput);
      if (userData) {
        setViewedUser(userData);
        if (userData.id !== currentUser.id) {
          setExploitAttempted(true);
          setStoryStage(2);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
          if (!completedChallenges.includes('access_control')) {
            setCompletedChallenges([...completedChallenges, 'access_control']);
            setPoints(points + 100);
          }
        }
      }
    };

    const executeTerminalCommand = (cmd) => {
      const output = [];
      if (cmd === 'help') {
        output.push('🔧 Commandes disponibles:');
        output.push('  whoami    - Qui suis-je ?');
        output.push('  ls        - Lister les secrets');
        output.push('  hack      - Pirater le système');
        output.push('  clear     - Effacer le terminal');
      } else if (cmd === 'whoami') {
        output.push(`Vous êtes: ${currentUser.username} ${currentUser.avatar}`);
        output.push(`Role: ${currentUser.role}`);
        output.push(`UserID stocké: ${localStorage.getItem('userId')}`);
      } else if (cmd === 'ls') {
        output.push('📁 Fichiers disponibles:');
        output.push('  users.json');
        output.push('  secrets.txt');
        output.push('  admin_vault.encrypted');
      } else if (cmd === 'hack') {
        output.push('🎯 Tentative de hack...');
        output.push('💡 Indice: localStorage.setItem("userId", "3")');
        output.push('Puis rechargez la page ! 😉');
      } else if (cmd === 'clear') {
        setTerminalCommands([]);
        return;
      } else {
        output.push(`❌ Commande inconnue: ${cmd}`);
        output.push('Tapez "help" pour l\'aide');
      }
      
      setTerminalCommands([...terminalCommands, { cmd, output }]);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-fall"
                style={{
                  left: Math.random() * 100 + '%',
                  top: '-50px',
                  animationDelay: Math.random() * 2 + 's',
                  animationDuration: Math.random() * 2 + 3 + 's'
                }}
              >
                {['🎉', '🎊', '✨', '🏆', '🔓'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        {/* Header avec Story Stage */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{currentUser?.avatar}</div>
                <div>
                  <h1 className="text-2xl font-bold">Village HIKORN</h1>
                  <p className="text-sm text-purple-200">{currentUser?.username} - {currentUser?.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full animate-pulse">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold">{points} pts</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    localStorage.removeItem('userId');
                    setActiveTab('home');
                  }}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                >
                  🚪 Sortir
                </button>
              </div>
            </div>

            {/* Story Progress Bar */}
            <div className="bg-white/10 rounded-full p-3 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{storyNarration[storyStage].title}</span>
                <span className="text-xs">Étape {storyStage + 1}/3</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((storyStage + 1) / 3) * 100}%` }}
                />
              </div>
              <p className="text-sm text-purple-100">{storyNarration[storyStage].text}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-8">
              {[
                { key: 'dashboard', icon: '🏠', label: 'Tableau de Bord' },
                { key: 'hack', icon: '🔓', label: 'Zone de Hack' },
                { key: 'security', icon: '🛡️', label: 'Apprendre' },
                { key: 'challenges', icon: '🎯', label: 'Défis' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quote du jour */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
                <p className="text-lg italic">"{currentUser?.quote}"</p>
                <p className="text-sm text-purple-100 mt-2">- {currentUser?.username}</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <Target className="w-10 h-10 mb-3" />
                  <h3 className="text-3xl font-bold mb-2">{completedChallenges.length}/5</h3>
                  <p className="text-blue-100">Défis complétés</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <Users className="w-10 h-10 mb-3" />
                  <h3 className="text-3xl font-bold mb-2">247</h3>
                  <p className="text-green-100">Membres actifs</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <Award className="w-10 h-10 mb-3" />
                  <h3 className="text-3xl font-bold mb-2">Niveau {Math.floor(points / 100) + 1}</h3>
                  <p className="text-purple-100">Votre niveau</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hack' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-xl shadow-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <Bug className="w-12 h-12 animate-bounce" />
                  <div>
                    <h2 className="text-3xl font-bold">🎯 Zone de Hack Éthique</h2>
                    <p className="text-orange-100">Trouvez la faille et devenez un expert !</p>
                  </div>
                </div>
              </div>

              {/* Le Panneau de Hack */}
              <div className="bg-white rounded-xl shadow-xl p-6 border-4 border-red-400">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">🔍 Panneau de Détective</h3>
                  <button
                    onClick={() => setInspectMode(!inspectMode)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      inspectMode 
                        ? 'bg-green-500 text-white animate-pulse' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {inspectMode ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    {inspectMode ? 'Mode Hacker ON' : 'Activer le Mode Hacker'}
                  </button>
                </div>

                {!inspectMode ? (
                  <div className="text-center py-12">
                    <Skull className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-4">
                      La zone de hack est verrouillée...
                    </p>
                    <p className="text-sm text-gray-500">
                      💡 Cliquez sur "Activer le Mode Hacker" pour commencer !
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Info actuelle */}
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                      <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                        <Key className="w-5 h-5 mr-2" />
                        📊 Vos Informations Actuelles
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded">
                          <p className="text-xs text-gray-600">Username</p>
                          <p className="font-mono font-bold">{currentUser?.username}</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <p className="text-xs text-gray-600">Role</p>
                          <p className="font-mono font-bold">{currentUser?.role}</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <p className="text-xs text-gray-600">User ID (localStorage)</p>
                          <p className="font-mono font-bold text-red-600">{localStorage.getItem('userId')}</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <p className="text-xs text-gray-600">Points</p>
                          <p className="font-mono font-bold">{currentUser?.points}</p>
                        </div>
                      </div>
                    </div>

                    {/* La Mission */}
                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1 animate-pulse" />
                        <div>
                          <h4 className="font-bold text-yellow-800 mb-2">
                            🎮 MISSION : Devenir Admin !
                          </h4>
                          <p className="text-sm text-yellow-700 mb-3">
                            Votre ID utilisateur est stocké dans le <code className="bg-yellow-200 px-2 py-1 rounded">localStorage</code>.
                            Et si vous essayiez d'accéder aux données d'autres utilisateurs ? 🤔
                          </p>
                          <div className="bg-white border border-yellow-300 rounded p-3 mb-3">
                            <p className="text-xs text-gray-700 mb-2 font-semibold">💡 Indices :</p>
                            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                              <li>L'admin a l'ID <code className="bg-gray-200 px-1 rounded">3</code></li>
                              <li>Le localStorage est modifiable côté client</li>
                              <li>L'application ne vérifie pas les autorisations !</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interface de Hack */}
                    <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono">
                      <div className="flex items-center space-x-2 mb-3">
                        <Terminal className="w-5 h-5" />
                        <span className="text-sm">Hackeur Console v1.0</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs">{'>'} system.getUserData(userId)</p>
                        <div className="flex space-x-2 mt-3">
                          <input
                            type="number"
                            value={userIdInput}
                            onChange={(e) => setUserIdInput(e.target.value)}
                            placeholder="Entrez un ID (1, 2, ou 3)"
                            className="flex-1 bg-gray-800 text-green-400 px-3 py-2 rounded border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <button
                            onClick={tryExploit}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold transition-colors flex items-center space-x-2"
                          >
                            <Bug className="w-4 h-4" />
                            <span>HACK!</span>
                          </button>
                        </div>
                      </div>

                      {viewedUser && (
                        <div className="mt-4 bg-gray-800 p-3 rounded border border-green-600 animate-fade-in">
                          <p className="text-xs text-green-300 mb-2">{'>'} Résultat de la requête:</p>
                          <pre className="text-xs overflow-x-auto">
{JSON.stringify({
  id: viewedUser.id,
  username: viewedUser.username,
  role: viewedUser.role,
  avatar: viewedUser.avatar,
  points: viewedUser.points,
  secretData: viewedUser.secretData || undefined,
  secretVault: viewedUser.secretVault || undefined
}, null, 2)}
                          </pre>
                          {viewedUser.secretData && (
                            <div className="mt-3 p-3 bg-green-900/50 border border-green-500 rounded animate-pulse">
                              <p className="text-sm font-bold text-green-400 mb-2 flex items-center">
                                <PartyPopper className="w-5 h-5 mr-2" />
                                🎉 JACKPOT ! Vous avez trouvé le trésor !
                              </p>
                              <p className="text-xs text-green-300">
                                Flag secret: <code className="bg-black px-2 py-1 rounded">{viewedUser.secretData}</code>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-2">🎓 École de Sécurité HIKORN</h2>
                <p className="text-purple-100">Comprenez la faille et apprenez à vous protéger !</p>
              </div>

              {/* Section 1: Qu'est-ce qui s'est passé ? */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">🔍</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Qu'est-ce qui s'est passé ?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Vous venez d'exploiter une faille de type <strong className="text-red-600">"Broken Access Control"</strong> 
                      - la vulnérabilité <strong>#1</strong> du classement OWASP Top 10 2021 !
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Étape 1 : Le Piège</h4>
                      <p className="text-sm text-gray-700">
                        L'application a stocké votre ID utilisateur dans le <code className="bg-red-100 px-2 py-1 rounded">localStorage</code> 
                        (côté client, dans votre navigateur).
                      </p>
                      <pre className="bg-gray-900 text-green-400 p-2 rounded mt-2 text-xs overflow-x-auto">
localStorage.setItem('userId', user.id); // ❌ DANGER !
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔓</span>
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Étape 2 : L'Exploit</h4>
                      <p className="text-sm text-gray-700">
                        Vous avez changé manuellement cet ID pour accéder aux données d'un autre utilisateur. 
                        L'application n'a <strong>jamais vérifié</strong> si vous aviez le droit !
                      </p>
                      <pre className="bg-gray-900 text-green-400 p-2 rounded mt-2 text-xs overflow-x-auto">
localStorage.setItem('userId', '3'); // ID de l'admin !
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Étape 3 : Le Jackpot</h4>
                      <p className="text-sm text-gray-700">
                        Résultat : Vous avez accédé aux données secrètes de l'admin, incluant le flag caché !
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Pourquoi c'est grave ? */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">⚠️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Pourquoi c'est GRAVE dans la vraie vie ?
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: '💳', title: 'Vol de données bancaires', desc: 'Accès aux comptes d\'autres utilisateurs' },
                    { icon: '🏥', title: 'Dossiers médicaux exposés', desc: 'Violation du secret médical' },
                    { icon: '💰', title: 'Amendes RGPD', desc: 'Jusqu\'à 4% du chiffre d\'affaires' },
                    { icon: '📉', title: 'Perte de confiance', desc: 'Clients qui fuient l\'application' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h4 className="font-bold text-orange-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Code Vulnérable vs Sécurisé */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">⚔️</span>
                  Combat : Code Vulnérable vs Code Sécurisé
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Code Vulnérable */}
                  <div className="border-4 border-red-500 rounded-lg p-4 bg-red-50">
                    <div className="flex items-center space-x-2 mb-3">
                      <Skull className="w-6 h-6 text-red-600" />
                      <h4 className="font-bold text-red-800 text-lg">❌ Code Vulnérable</h4>
                    </div>
                    <pre className="bg-gray-900 text-red-400 p-4 rounded text-xs overflow-x-auto">
{`// ❌ CÔTÉ CLIENT (React)
const getUserData = (userId) => {
  // Récupération directe sans vérif
  return users.find(
    u => u.id === parseInt(userId)
  );
  // 🚨 N'importe qui peut lire
  // n'importe quelle donnée !
}

// ❌ Stockage non sécurisé
localStorage.setItem('userId', user.id);
// 🚨 L'utilisateur peut modifier ça !`}
                    </pre>
                    <div className="mt-3 bg-red-100 border border-red-300 rounded p-3">
                      <p className="text-xs text-red-800 font-semibold">
                        🔥 Problèmes : Pas de vérification, données modifiables, confiance au client
                      </p>
                    </div>
                  </div>

                  {/* Code Sécurisé */}
                  <div className="border-4 border-green-500 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="w-6 h-6 text-green-600" />
                      <h4 className="font-bold text-green-800 text-lg">✅ Code Sécurisé</h4>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`// ✅ CÔTÉ SERVEUR (Node.js)
app.get('/api/user/:id', 
  authenticateToken, // Token JWT
  (req, res) => {
  
  const requestedId = req.params.id;
  const currentId = req.user.id;
  
  // ✅ VÉRIFICATION CRITIQUE
  if (requestedId !== currentId 
      && req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Accès refusé !'
    });
  }
  
  // OK, retourner les données
  res.json(getUserData(requestedId));
});`}
                    </pre>
                    <div className="mt-3 bg-green-100 border border-green-300 rounded p-3">
                      <p className="text-xs text-green-800 font-semibold">
                        🛡️ Protection : Vérif serveur, token sécurisé, principe du moindre privilège
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Les 5 Règles d'Or */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Trophy className="w-8 h-8 mr-3" />
                  🏆 Les 5 Règles d'Or de la Sécurité
                </h3>
                <div className="space-y-3">
                  {[
                    { num: 1, rule: 'Ne JAMAIS faire confiance au client', icon: '🚫' },
                    { num: 2, rule: 'TOUJOURS vérifier côté serveur', icon: '✅' },
                    { num: 3, rule: 'Utiliser des tokens sécurisés (JWT + HTTPS)', icon: '🔐' },
                    { num: 4, rule: 'Principe du moindre privilège', icon: '🎯' },
                    { num: 5, rule: 'Logger les tentatives suspectes', icon: '📝' }
                  ].map((item) => (
                    <div key={item.num} className="bg-white/20 backdrop-blur rounded-lg p-4 flex items-center space-x-4">
                      <div className="text-3xl font-bold">{item.num}</div>
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{item.rule}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Quiz Rapide */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-500">
                <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">🧠</span>
                  Quiz Éclair : Testez vos connaissances !
                </h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 mb-3">
                      Q1: Où doit-on TOUJOURS vérifier les autorisations ?
                    </p>
                    <div className="space-y-2">
                      {['A) Côté client', 'B) Côté serveur ✅', 'C) Les deux', 'D) Ça dépend'].map((opt, i) => (
                        <div key={i} className={`p-2 rounded ${i === 1 ? 'bg-green-100 border-2 border-green-500' : 'bg-white border'}`}>
                          <p className="text-sm">{opt}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-green-700 mt-2 font-semibold">
                      💡 Le client peut être manipulé ! Seul le serveur est fiable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">🎯 Défis HIKORN</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'access_control', title: '🔓 Découvrir la faille', points: 100, icon: Unlock, color: 'red', desc: 'Trouvez et exploitez la faille de sécurité' },
                  { id: 'linux_migration', title: '🐧 Migration Linux', points: 150, icon: Terminal, color: 'blue', desc: 'Simulez une migration vers Linux' },
                  { id: 'waste_calc', title: '🌱 Empreinte Carbone', points: 80, icon: Zap, color: 'green', desc: 'Calculez votre impact numérique' },
                  { id: 'resource_share', title: '📚 Partage de Ressource', points: 120, icon: BookOpen, color: 'purple', desc: 'Partagez une ressource libre' },
                  { id: 'community', title: '👥 Rejoindre HIKORN', points: 50, icon: Users, color: 'yellow', desc: 'Devenez membre actif' },
                ].map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`bg-white rounded-xl shadow-lg p-6 border-2 transform hover:scale-105 transition-transform ${
                      completedChallenges.includes(challenge.id)
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${challenge.color}-100`}>
                        <challenge.icon className={`w-6 h-6 text-${challenge.color}-600`} />
                      </div>
                      {completedChallenges.includes(challenge.id) && (
                        <CheckCircle className="w-8 h-8 text-green-600 animate-bounce" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{challenge.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">+{challenge.points} points</span>
                      <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">
                        {completedChallenges.includes(challenge.id) ? '✓ Fait !' : 'Commencer →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!currentUser) {
    return <LoginScreen />;
  }

  return <DashboardScreen />;
};

export default HIKORNPlatform;