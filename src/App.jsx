import React, { useState } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function App() {
  const [activeModel, setActiveModel] = useState('linear');
  const [showDetails, setShowDetails] = useState(false);

  // Real world data: Years of experience vs Salary
  // Based on realistic tech industry patterns
  const generateData = () => {
    const data = [];
    for (let experience = 0; experience <= 20; experience++) {
      // Base salary pattern: starts at 45k, grows quadratically at first (rapid early growth),
      // then levels off (diminishing returns with experience)
      const baseSalary = 45 + 15 * experience - 0.3 * experience * experience;

      // Real world noise: salary variation due to negotiation, company size, location, etc.
      // Represents ±10k variance
      const realWorldVariation = (Math.random() - 0.5) * 20;

      const salary = baseSalary + realWorldVariation;

      data.push({
        experience,
        actual: Math.max(salary, 40) // minimum salary floor
      });
    }
    return data;
  };

  const rawData = generateData();

  // Linear regression - assumes constant salary growth per year
  const linearFit = rawData.map(d => ({
    ...d,
    predicted: 45 + 5 * d.experience
  }));

  // Polynomial regression - captures the reality: fast early growth, then plateaus
  const polynomialFit = rawData.map(d => ({
    ...d,
    predicted: 45 + 15 * d.experience - 0.3 * d.experience * d.experience
  }));

  // Decision tree - creates salary bands based on experience brackets
  const decisionTreeFit = rawData.map(d => {
    let predicted;
    if (d.experience < 2) predicted = 50; // Junior: $50k
    else if (d.experience < 5) predicted = 75; // Mid-level: $75k
    else if (d.experience < 10) predicted = 105; // Senior: $105k
    else if (d.experience < 15) predicted = 120; // Lead: $120k
    else predicted = 130; // Principal: $130k
    return { ...d, predicted };
  });

  // Neural network - learns complex patterns including market conditions, skill plateau effects
  const neuralNetFit = rawData.map(d => ({
    ...d,
    predicted: 45 + 15 * d.experience - 0.3 * d.experience * d.experience +
        3 * Math.sin(d.experience * 0.4) // captures market cycles and skill growth spurts
  }));

  const models = {
    linear: { data: linearFit, name: 'Linear Regression', color: '#3b82f6' },
    polynomial: { data: polynomialFit, name: 'Polynomial Regression', color: '#10b981' },
    tree: { data: decisionTreeFit, name: 'Decision Tree', color: '#f59e0b' },
    neural: { data: neuralNetFit, name: 'Neural Network', color: '#8b5cf6' }
  };

  const descriptions = {
    linear: {
      title: 'Linear Regression',
      desc: 'Assumes salary increases by a fixed amount every year (£5k/year). Misses the reality that early career growth is faster than late career.',
      when: 'When relationship is actually linear (rare in real life)',
      howItWorks: 'Draws a straight line through the data: y = mx + b. Here: Salary = £45k + (£5k × years). The scattered dots (±£10k noise) represent real-world variation - negotiation, company size, location, etc. The line finds the average trend through this noise.',
      realExample: 'Like saying: "Every year of experience adds exactly £5k to your salary, no matter if you\'re year 1 or year 20." The scatter shows two people with 5 years experience might make £65k and £85k due to individual differences, but the model predicts £70k (the trend).',
      visualPattern: 'Straight diagonal line - constant slope. Dots scatter above and below showing real-world noise.',
      pros: ['Simple to understand', 'Fast to compute', 'Works with small datasets', 'Handles noise well - doesn\'t overfit'],
      cons: ['Rarely fits real-world curved relationships', 'Oversimplifies complex patterns', 'Poor for non-linear data']
    },
    polynomial: {
      title: 'Polynomial Regression',
      desc: 'Captures the curved reality: salary grows rapidly in early career (0-7 years), then growth slows as you plateau. Matches real career progression.',
      when: 'When data has clear curves - early career acceleration then plateau',
      howItWorks: 'Uses powers of x: y = a + bx + cx². Here: Salary = 45 + 15×years - 0.3×years². The curve fits through the noisy scatter, capturing the underlying trend that early career growth is faster.',
      realExample: 'Junior to Mid (0-5 yrs): +£15k/year. Mid to Senior (5-10 yrs): +£10k/year. Senior+ (10-20 yrs): +£5k/year. Growth slows naturally. The ±£10k noise around the curve represents individual differences in performance, company, negotiation.',
      visualPattern: 'Smooth curve that rises fast then flattens (inverted U shape). Dots scatter around the curve.',
      pros: ['Captures natural growth patterns', 'Fits career progression', 'Still interpretable', 'Good at handling noise in curved data'],
      cons: ['Can go wild outside data range', 'Higher powers can overfit', 'Needs careful degree selection']
    },
    tree: {
      title: 'Decision Tree Regression',
      desc: 'Creates clear salary bands like HR departments do: Junior/Mid/Senior/Lead/Principal. Easy to explain to stakeholders.',
      when: 'When you need clear rules and thresholds that humans can understand',
      howItWorks: 'Asks questions at each node: "Experience < 2 years? → £50k. Else, experience < 5? → £75k..." Creates a flowchart. Ignores the individual noise - just assigns everyone in a bracket to the same salary band.',
      realExample: 'Exactly like job postings: "Junior (0-2 yrs): £50k | Mid (3-5 yrs): £75k | Senior (5-10 yrs): £105k | Lead (10-15 yrs): £120k | Principal (15+ yrs): £130k". The noisy dots show real people in each band make different amounts, but the tree predicts the band average.',
      visualPattern: 'Horizontal steps/stairs - flat salary bands with sudden jumps. Noise creates scatter within each step.',
      pros: ['Crystal clear rules', 'Matches how HR thinks', 'Non-technical people understand it', 'Robust to outliers/noise'],
      cons: ['Unrealistic sudden jumps (4.9 yrs ≠ 5.0 yrs)', 'Ignores smooth transitions', 'Can create too many splits', 'Loses individual variation']
    },
    neural: {
      title: 'Neural Network Regression',
      desc: 'Learns complex patterns: career growth spurts, market cycles, skill development phases. Can capture non-obvious factors affecting salary.',
      when: 'When relationships are complex with many hidden factors',
      howItWorks: 'Layers of neurons learn patterns. Input → Hidden layers transform data → Output predicts salary. Learns features automatically. With enough data, can distinguish signal from noise.',
      realExample: 'Learns: "Early career spike + dip at 5 years (job hop anxiety) + recovery at 7 years + plateau at 15 years + market cycle wiggles." The wavy line tries to follow the noisy dots more closely than linear/polynomial, capturing subtleties. BUT can overfit noise if not careful!',
      visualPattern: 'Smooth wavy curve - follows data closely with slight oscillations. May try to fit noise instead of true trend if undertrained.',
      pros: ['Learns complex interactions', 'Finds hidden patterns', 'Improves with more data', 'Handles high dimensions', 'Can learn what is noise vs signal'],
      cons: ['Needs tons of data (10,000+ points)', 'Black box - hard to explain', 'Can overfit easily to noise', 'Computationally expensive']
    }
  };

  return (
      <div className="w-full min-h-screen p-8 bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Logo and Branding */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <img
              src="/images/logo.png"
              alt="Tech Angel X Logo"
              className="w-16 h-16 rounded-full shadow-lg border-2 border-white"
          />
          <div className="text-sm">
            <p className="font-bold text-gray-800">Tech Angel X</p>
            <p className="text-gray-600 text-xs">by Ricki Angel</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 mt-12">Salary Prediction: Regression Methods Compared</h1>
        <p className="text-center text-gray-600 mb-2">Real-world example: Predicting salary based on years of experience</p>
        <p className="text-center text-sm text-gray-500 mb-8">Each dot represents a real employee with natural salary variation</p>

        <div className="max-w-6xl mx-auto">
          {/* Model selector buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {Object.entries(models).map(([key, model]) => (
                <button
                    key={key}
                    onClick={() => setActiveModel(key)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        activeModel === key
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                >
                  {model.name}
                </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={models[activeModel].data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="experience"
                    label={{ value: 'Years of Experience', position: 'insideBottom', offset: -5 }}
                    stroke="#6b7280"
                />
                <YAxis
                    label={{ value: 'Salary ($1000s)', angle: -90, position: 'insideLeft' }}
                    stroke="#6b7280"
                    domain={[30, 140]}
                />
                <Tooltip
                    formatter={(value, name) => {
                      if (name === 'actual') return [`$${Math.round(value)}k`, 'Actual Salary'];
                      return [`$${Math.round(value)}k`, 'Predicted Salary'];
                    }}
                    labelFormatter={(label) => `${label} years experience`}
                />
                <Scatter
                    data={models[activeModel].data}
                    fill="#94a3b8"
                    name="actual"
                    shape="circle"
                />
                <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke={models[activeModel].color}
                    strokeWidth={3}
                    dot={true}
                    name="predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold" style={{ color: models[activeModel].color }}>
                {descriptions[activeModel].title}
              </h2>
              <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                {showDetails ? '− Hide Details' : '+ Show Details'}
              </button>
            </div>

            <p className="text-gray-700 text-lg mb-3">
              {descriptions[activeModel].desc}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="text-sm font-semibold text-blue-900">Best used:</p>
              <p className="text-blue-800">{descriptions[activeModel].when}</p>
            </div>

            {/* Expandable detailed section */}
            {showDetails && (
                <div className="mt-6 space-y-4 border-t pt-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                      <span className="text-2xl mr-2">🔧</span> How It Works
                    </h3>
                    <p className="text-gray-700">{descriptions[activeModel].howItWorks}</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                      <span className="text-2xl mr-2">💡</span> Real-World Example
                    </h3>
                    <p className="text-gray-700">{descriptions[activeModel].realExample}</p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                      <span className="text-2xl mr-2">📊</span> Visual Pattern
                    </h3>
                    <p className="text-gray-700">{descriptions[activeModel].visualPattern}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                      <h3 className="font-bold text-green-800 mb-2">✅ Pros</h3>
                      <ul className="text-sm text-green-900 space-y-1">
                        {descriptions[activeModel].pros.map((pro, idx) => (
                            <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                      <h3 className="font-bold text-red-800 mb-2">❌ Cons</h3>
                      <ul className="text-sm text-red-900 space-y-1">
                        {descriptions[activeModel].cons.map((con, idx) => (
                            <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
            )}
          </div>

          {/* Why the scatter/noise exists */}
          <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-orange-700 mb-3">Understanding the Scatter: Real-World Variation</h3>
            <p className="text-gray-700 mb-3">
              In the real world, salary isn't ONLY determined by years of experience. The scatter represents real-world variation from:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Individual Factors:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Negotiation skills</li>
                  <li>• Education level (BSc vs MSc vs PhD)</li>
                  <li>• Specialisation (ML engineer vs web dev)</li>
                  <li>• Performance and productivity</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">External Factors:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Company size (startup vs FAANG)</li>
                  <li>• Geographic location</li>
                  <li>• Market timing (hired in boom vs recession)</li>
                  <li>• Industry (finance vs non-profit)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-sm text-blue-900">
                <strong>This is why we need regression:</strong> We can't predict exact salaries, but we can predict the <em>trend</em> and understand the general relationship. The model finds the signal through the noise.
              </p>
            </div>
          </div>

          {/* Ridge & Lasso explanation */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-3">Ridge Regression</h3>
              <p className="text-gray-700 mb-3">
                Imagine predicting salary with 50 factors: experience, education, GitHub commits, interview score, previous salary, etc.
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600">Ridge says: "Keep all 50 factors, but don't let any one dominate too much"</p>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Effect:</strong> Prevents overfitting to quirks in your data. All factors contribute a little, nothing goes crazy.
              </p>
              <p className="text-purple-600 text-sm mt-2 font-semibold">
                Real example: Predicting salary with experience, education, skills, location, company size, and 45 other factors
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-3">Lasso Regression</h3>
              <p className="text-gray-700 mb-3">
                Same 50 factors, but Lasso is ruthless: it eliminates the weak ones entirely.
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600">Lasso says: "Only 8 factors actually matter. The other 42? Irrelevant. Gone."</p>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Effect:</strong> Automatic feature selection. You discover that only experience, education, location, and specialisation really drive salary.
              </p>
              <p className="text-green-600 text-sm mt-2 font-semibold">
                Real example: Discovers that favorite programming language, coffee preference, and desk setup don't predict salary
              </p>
            </div>
          </div>

          {/* Neural network deep dive */}
          <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Neural Network Regression Explained</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Real-world example:</h4>
                <p className="text-gray-700 mb-4">
                  Predicting house prices from photos. The neural network learns: Layer 1 detects edges, Layer 2 recognizes windows/doors, Layer 3 identifies architectural style, Final layer predicts price.
                </p>

                <h4 className="font-bold text-gray-800 mb-2">For salary prediction:</h4>
                <p className="text-gray-700">
                  Can learn that "5 years experience + ML specialisation + Bay Area" creates a non-linear jump in salary. Captures interactions that simple regression misses.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">Why it's powerful:</h4>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Learns feature combinations automatically</li>
                  <li>• Finds hidden patterns humans don't notice</li>
                  <li>• Works with messy, high-dimensional data</li>
                  <li>• Can improve with more data</li>
                </ul>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Trade-off:</strong> Needs 10,000+ examples to work well. Ridge/Lasso work fine with 100 examples.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-12 text-center pb-8">
          <div className="border-t border-gray-300 pt-6">
            <p className="text-gray-600 text-sm">
              © 2024 <span className="font-semibold">Ricki Angel</span> | <span className="font-semibold text-indigo-600">Tech Angel X</span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Interactive Regression Visualization Tool
            </p>
          </div>
        </div>
      </div>
  );
}

export default App;
