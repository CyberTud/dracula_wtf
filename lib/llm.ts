import { VampireBucket, Scores } from './rubric'

export type AIProvider = 'anthropic' | 'openai' | 'fallback'

interface LLMResponse {
  roast: string
  success: boolean
}

const FALLBACK_ROASTS: Record<VampireBucket, string[]> = {
  'Pure Soul': [
    'Ah, a rare specimen indeed! Your text is as pure as fresh mountain water. I am disappointed... I mean, delighted by your wholesome nature.',
    'Fascinating! Not a drop of vampiric essence. You must be quite boring at parties... I mean, refreshingly authentic!',
    'My fangs retract in your presence. Such purity! Though I wonder if you are perhaps too innocent for this dark world.',
  ],
  'Slight Fang': [
    'I detect the faintest hint of darkness within you. Like a vampire who only drinks organic, locally-sourced blood.',
    'Ah, a baby vampire! Still learning to embrace the shadows. Your attempts at darkness are almost... cute.',
    'You show promise, young one. With proper mentoring, you could become adequately bloodthirsty.',
  ],
  'Opportunistic': [
    'Now we are talking! You feast when convenient, like a vampire with a LinkedIn Premium account.',
    'I see you have mastered the art of selective vampirism. Draining energy only from those who deserve it, yes?',
    'Half mortal, half creature of the night. You would make an excellent middle manager in my castle.',
  ],
  'Thirsty': [
    'My my, such thirst! You drain others with the efficiency of a corporate restructuring. I am almost impressed.',
    'Your vampiric nature is strong! You could give my cousin Nosferatu lessons in resource extraction.',
    'The blood moon rises for you! Such magnificent manipulation tactics. We should compare notes sometime.',
  ],
  'Ancient Vampire': [
    'At last, a kindred spirit! Your text drips with the essence of a thousand drained souls. We must be related!',
    'Magnificent! You have achieved peak vampirism. Even I, Count Dracula, bow to your bloodsucking prowess.',
    'Your darkness is so profound, it makes my castle look like a beach resort. Truly, you are the apex predator!',
  ],
}

async function callAnthropic(
  text: string, 
  mode: string, 
  evidence: string[], 
  scores: Scores & { overall_vampire_score: number },
  bucket: VampireBucket
): Promise<LLMResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return getFallbackRoast(bucket, scores)
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 150,
        temperature: 0.8,
        system: `You are Count Dracula, providing witty, satirical roasts about text that shows vampire-like behavior. 
        Keep responses under 90 words. Be funny but safe (PG-13), avoid protected classes, punch up only.
        Reference the vampire bucket (${bucket}) and incorporate 1-2 evidence snippets naturally.
        Voice: aristocratic, dramatic, slightly self-deprecating humor.`,
        messages: [{
          role: 'user',
          content: `Analyze this ${mode} text with vampire score ${scores.overall_vampire_score}:
          Evidence: ${evidence.slice(0, 2).join(' | ')}
          Main issues: ${Object.entries(scores).filter(([_, v]) => v > 50).map(([k]) => k).join(', ')}
          Give a short Dracula roast.`
        }]
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      roast: data.content[0].text.substring(0, 200),
      success: true,
    }
  } catch (error) {
    console.error('Anthropic API error:', error)
    return getFallbackRoast(bucket, scores)
  }
}

async function callOpenAI(
  text: string,
  mode: string,
  evidence: string[],
  scores: Scores & { overall_vampire_score: number },
  bucket: VampireBucket
): Promise<LLMResponse> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return getFallbackRoast(bucket, scores)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.8,
        messages: [
          {
            role: 'system',
            content: `You are Count Dracula, providing witty, satirical roasts about text that shows vampire-like behavior. 
            Keep responses under 90 words. Be funny but safe (PG-13), avoid protected classes, punch up only.
            Reference the vampire bucket (${bucket}) and incorporate 1-2 evidence snippets naturally.
            Voice: aristocratic, dramatic, slightly self-deprecating humor.`
          },
          {
            role: 'user',
            content: `Analyze this ${mode} text with vampire score ${scores.overall_vampire_score}:
            Evidence: ${evidence.slice(0, 2).join(' | ')}
            Main issues: ${Object.entries(scores).filter(([_, v]) => v > 50).map(([k]) => k).join(', ')}
            Give a short Dracula roast.`
          }
        ]
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      roast: data.choices[0].message.content.substring(0, 200),
      success: true,
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    return getFallbackRoast(bucket, scores)
  }
}

function getFallbackRoast(bucket: VampireBucket, scores: Scores & { overall_vampire_score: number }): LLMResponse {
  const roasts = FALLBACK_ROASTS[bucket]
  const index = Math.floor(Math.abs(scores.overall_vampire_score) % roasts.length)
  
  return {
    roast: roasts[index],
    success: true,
  }
}

export async function generateRoast(
  text: string,
  mode: string,
  evidence: string[],
  scores: Scores & { overall_vampire_score: number },
  bucket: VampireBucket
): Promise<string> {
  const provider = process.env.AI_PROVIDER as AIProvider || 'fallback'
  
  let response: LLMResponse
  
  const timeout = new Promise<LLMResponse>((resolve) => {
    setTimeout(() => resolve(getFallbackRoast(bucket, scores)), 3000)
  })
  
  try {
    switch (provider) {
      case 'anthropic':
        response = await Promise.race([
          callAnthropic(text, mode, evidence, scores, bucket),
          timeout
        ])
        break
      case 'openai':
        response = await Promise.race([
          callOpenAI(text, mode, evidence, scores, bucket),
          timeout
        ])
        break
      default:
        response = getFallbackRoast(bucket, scores)
    }
  } catch (error) {
    console.error('LLM error:', error)
    response = getFallbackRoast(bucket, scores)
  }
  
  return response.roast
}