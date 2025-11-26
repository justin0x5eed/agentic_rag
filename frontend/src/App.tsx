import { useEffect, useRef, useState } from 'react'
import './App.css'

const getCsrfToken = () => {
  if (typeof document === 'undefined') return ''
  return document.querySelector("meta[name='csrf-token']")?.getAttribute('content') ?? ''
}

const translations = {
  en: {
    ragTitle: 'RAG',
    ragHeading: 'Retrieval-Augmented Generation',
    subtitle: 'Choose models, upload documents, and pair web search for stronger RAG.',
    agenticTitle: 'Agentic RAG',
    agenticHeading: 'Agentic Retrieval-Augmented Generation',
    agenticSubtitle:
      'Agentic RAG follows an Observe–Think–Act loop to judge whether retrieval is needed, rewrite and optimize prompts, and choose between tool calls or direct answers.',
    agenticObserveTitle: 'Observe',
    agenticObserveDescription:
      'Agentic RAG automatically understands user intent, context, and existing information. It does not retrieve blindly; it first inspects the input and conversation state to decide whether to access the knowledge base or search sources.',
    agenticThinkTitle: 'Think',
    agenticThinkDescription:
      'More than querying, it reasons like an agent. The model plans its next move: retrieve? search? call a tool? This makes the system more precise, efficient, and closer to real “thinking” behavior.',
    agenticActTitle: 'Act',
    agenticActDescription:
      'Based on its reasoning, it automatically chooses an action path: perform retrieval, call tools, process data, or answer directly. The entire process is traceable and controllable, delivering more accurate and reliable answers.',
    uploadLabel: 'RAG documents',
    uploadHint: 'Drag & drop files or click to select',
    uploaded: 'uploaded',
    uploading: 'Embedding...',
    uploadSuccess: 'Files embedded successfully.',
    uploadError: 'Upload failed. Please try again.',
    knowledgeBaseTitle: 'Knowledge base',
    knowledgeBaseDescription:
      'Upload knowledge base files so the agent can answer with private knowledge, broaden its scope, and reduce hallucinations.',
    supportedFormats: 'Supports uploading multiple files and accepts TXT and DOC formats.',
    webSearch: 'Enable web search',
    webSearchTitle: 'Web search',
    webSearchDescription: 'Enable web search so the agent can retrieve information from the web.',
    tools: 'Enable tools',
    toolsTitle: 'Tools calling',
    toolsDescription: 'Choose which utilities the agent may call mid-conversation.',
    chooseTools: 'Available tools',
    modelTitle: 'Model selection',
    modelDescription: 'Pick the foundation model the agent will use while responding.',
    modelLabel: 'Available models',
    language: 'Language',
    chatTitle: 'Chat playground',
    chatSubtitle: 'Agent loop visualized',
    inputPlaceholder: 'Ask anything to the agent...',
    send: 'Send',
    clear: 'Clear chat',
    welcome: 'Hello! I can decide when to use RAG, web search, or tools while answering.',
    reasoning: 'Agent reasoning',
    using: 'Using',
    idle: 'No extra actions were required. Returning the answer.',
    serverError: 'The server is temporarily unreachable. Please try again later.',
    githubLink: 'View on GitHub',
    badges: {
      rag: 'RAG lookup',
      web: 'Web search',
      tool: 'Tool call',
    },
    participants: {
      user: 'You',
      agent: 'Agent',
    },
  },
  zh: {
    ragTitle: '检索增强生成RAG',
    ragHeading: 'Retrieval-Augmented Generation',
    subtitle: '选择模型、上传文档，结合 Web 搜索实现更强大的检索增强生成。',
    agenticTitle: 'Agentic RAG',
    agenticHeading: '带推理决策能力的智能检索生成',
    agenticSubtitle:
      'Agentic RAG 通过“观察—思考—行动”闭环，不仅能判断是否需要检索，还能主动重写与优化Prompt，再在工具调用与直接回答之间做出最佳选择。',
    agenticObserveTitle: '观察（Observe）',
    agenticObserveDescription:
      'Agentic RAG 会自动理解用户意图、上下文和已有信息。它不盲目检索，而是先观察输入内容和对话状态，评估是否需要访问知识库或搜索来源。',
    agenticThinkTitle: '思考下一步（Think）',
    agenticThinkDescription:
      '不仅是查询，而是智能体式推理。模型会自主规划下一步：要不要检索？要不要搜索？要不要调用工具？这一过程让系统更精准、更高效，也更贴近真实“思考”的行为。',
    agenticActTitle: '采取行动（Act）',
    agenticActDescription:
      '根据推理结果自动选择行动路线：执行检索、调用工具、处理数据或直接回答。整个过程可追踪、可控，最终提供更准确、更可靠的答案。',
    uploadLabel: 'RAG 文档',
    uploadHint: '拖拽文件或点击选择',
    uploaded: '已上传',
    uploading: '正在 embedding ...',
    uploadSuccess: '文件 embedded 成功。',
    uploadError: '上传失败，请重试。',
    knowledgeBaseTitle: '知识库',
    knowledgeBaseDescription: '上传知识库文档，让智能体基于私有知识库回答问题，扩展智能体知识范围，降低模型幻觉。',
    supportedFormats: '支持上传多个文件，支持 TXT、DOC 格式',
    webSearch: '启用网络搜索',
    webSearchTitle: 'Web 搜索',
    webSearchDescription: '启用 Web 搜索功能让智能体通过搜索引擎检索信息。',
    tools: '启用工具',
    toolsTitle: 'Tools 调用',
    toolsDescription: '启用工具，拓展智能体能力',
    chooseTools: '可用工具',
    modelTitle: '大模型选择',
    modelDescription: '决定智能体回答时调用的大语言模型。',
    modelLabel: '可用模型',
    language: '界面语言',
    chatTitle: '聊天演练场',
    chatSubtitle: '智能体循环可视化',
    inputPlaceholder: '向智能体提问...',
    send: '发送',
    clear: '清空对话',
    welcome: '你好！我会在需要时自动决定是否使用 RAG、搜索或工具。',
    reasoning: '智能体推理',
    using: '使用',
    idle: '无需额外操作，直接返回答案。',
    serverError: '当前服务器暂时无法连接，请稍后再次尝试。',
    githubLink: '前往 GitHub',
    badges: {
      rag: 'RAG 检索',
      web: '网络搜索',
      tool: '工具调用',
    },
    participants: {
      user: '你',
      agent: '智能体',
    },
  },
  'zh-hant': {
    ragTitle: '檢索增強生成RAG',
    ragHeading: 'Retrieval-Augmented Generation',
    subtitle: '選擇模型、上傳文件，結合 Web 搜尋實現更強大的檢索增強生成。',
    agenticTitle: 'Agentic RAG',
    agenticHeading: '攜帶推理決策能力的智慧搜尋生成',
    agenticSubtitle:
      'Agentic RAG 透過「觀察－思考－行動」閉環，不僅能判斷是否需要檢索，還能主動重寫與優化Prompt，再在工具呼叫與直接回答之間做出最佳選擇。',
    agenticObserveTitle: '觀察（Observe）',
    agenticObserveDescription:
      'Agentic RAG 會自動理解使用者意圖、上下文和既有資訊。它不會盲目檢索，而是先觀察輸入內容與對話狀態，評估是否需要存取知識庫或搜尋來源。',
    agenticThinkTitle: '思考下一步（Think）',
    agenticThinkDescription:
      '不僅是查詢，而是智慧體式推理。模型會自主規劃下一步：要不要檢索？要不要搜尋？要不要呼叫工具？這讓系統更精準、更高效，也更貼近真實的「思考」行為。',
    agenticActTitle: '採取行動（Act）',
    agenticActDescription:
      '根據推理結果自動選擇行動路徑：執行檢索、呼叫工具、處理資料或直接回答。整個流程可追蹤、可控，最後提供更準確、更可靠的答案。',
    uploadLabel: 'RAG 文件',
    uploadHint: '拖曳檔案或點擊選擇',
    uploaded: '已上傳',
    uploading: '正在 embedding ...',
    uploadSuccess: '檔案 embedded 成功。',
    uploadError: '上傳失敗，請再試一次。',
    knowledgeBaseTitle: '知識庫',
    knowledgeBaseDescription:
      '上傳知識庫文件，讓智慧體基於私有知識庫回答問題，擴展智慧體知識範圍，降低模型幻覺。',
    supportedFormats: '支援上傳多個檔案，支援 TXT、DOC 格式',
    webSearch: '啟用網路搜尋',
    webSearchTitle: '網路搜尋',
    webSearchDescription: '啟用 Web 搜尋功能讓智慧體透過網路檢索資訊。',
    tools: '啟用工具',
    toolsTitle: '工具呼叫',
    toolsDescription: '挑選智慧體可使用的工具，延伸能力。',
    chooseTools: '可用工具',
    modelTitle: '大模型選擇',
    modelDescription: '決定智慧體回覆時會使用的大型語言模型。',
    modelLabel: '可用模型',
    language: '介面語言',
    chatTitle: '聊天練習場',
    chatSubtitle: '智慧體循環視覺化',
    inputPlaceholder: '向智慧體提問...',
    send: '傳送',
    clear: '清除對話',
    welcome: '你好！我會在需要時自動決定是否使用 RAG、搜尋或工具。',
    reasoning: '智慧體推理',
    using: '使用',
    idle: '無需額外操作，直接回覆答案。',
    serverError: '目前伺服器暫時無法連接，請稍後再次嘗試。',
    githubLink: '前往 GitHub',
    badges: {
      rag: 'RAG 檢索',
      web: '網路搜尋',
      tool: '工具呼叫',
    },
    participants: {
      user: '你',
      agent: '智慧體',
    },
  },
} as const

type Language = keyof typeof translations

type Message = {
  role: 'user' | 'assistant'
  content: string
  annotations?: string[]
}

const normalizeMessageContent = (content: string): string =>
  content.replace(/\\n/g, '\n').replace(/\r\n/g, '\n')

const formatBackendResponse = (data: unknown): string => {
  if (data === null || typeof data === 'undefined') {
    return 'No response received from backend.'
  }

  if (typeof data === 'object') {
    try {
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.warn('Failed to stringify backend payload', error)
    }
  }

  return String(data)
}

const tools: { id: string; label: Record<Language, string> }[] = [
  { id: 'calculator', label: { en: 'Image generation', zh: '图像生成', 'zh-hant': '圖像生成' } },
  { id: 'calendar', label: { en: 'Data crawling', zh: '数据爬取', 'zh-hant': '資料爬取' } },
  { id: 'code', label: { en: 'API call', zh: 'API调用', 'zh-hant': 'API 呼叫' } },
  { id: 'weather', label: { en: 'Code executor', zh: '代码执行器', 'zh-hant': '程式執行器' } },
]

const modelLabels: Record<string, string> = {
  qwen3: 'Qwen 3',
  gemma3: 'Gemma 3',
  'gpt-oss': 'GPT-OSS',
}

const controlTabs = [
  {
    id: 'rag',
    label: 'RAG',
  },
  {
    id: 'agentic-rag',
    label: 'Agentic RAG',
  },
] satisfies {
  id: 'rag' | 'agentic-rag'
  label: string
}[]

const readBackendModels = (): Record<string, string> => {
  if (typeof document === 'undefined') return {}

  const root = document.getElementById('vite_root')
  if (!root) return {}

  const raw = root.getAttribute('data-models')
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch (error) {
    console.warn('Failed to parse backend models data attribute', error)
    return {}
  }
}

function App() {
  const backendModels = readBackendModels()
  const availableModelIds = Object.keys(backendModels)
  const modelOptions: { id: string; label: string }[] =
    (availableModelIds.length > 0 ? availableModelIds : Object.keys(modelLabels)).map((id) => ({
      id,
      label: modelLabels[id] ?? id,
    }))
  const [language, setLanguage] = useState<Language>('zh')
  const t = translations[language]
  const [documents, setDocuments] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>(
    'idle',
  )
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [enableWebSearch, setEnableWebSearch] = useState(true)
  const [enableTools, setEnableTools] = useState(true)
  const [selectedModel, setSelectedModel] = useState(() => modelOptions[0]?.id ?? '')
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: t.welcome }])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const chatWindowRef = useRef<HTMLDivElement | null>(null)
  const [activeControlTab, setActiveControlTab] = useState<'rag' | 'agentic-rag'>('rag')

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return

    const selectedFiles = Array.from(event.target.files)
    setDocuments(selectedFiles)
    setUploadStatus('uploading')
    setUploadError(null)

    const csrfToken = getCsrfToken()

    try {
      await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch('/api/upload/', {
            method: 'POST',
            headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined,
            body: formData,
          })

          if (!response.ok) {
            let detail: string | undefined
            try {
              const payload = await response.json()
              if (payload && typeof payload === 'object' && 'detail' in payload) {
                detail = String(payload.detail)
              }
            } catch (error) {
              console.warn('Failed to parse upload error response', error)
            }
            throw new Error(detail ?? `Upload failed with status ${response.status}`)
          }
        }),
      )
      setUploadStatus('success')
    } catch (error) {
      console.error('Failed to upload document(s)', error)
      setUploadStatus('error')
      setUploadError(error instanceof Error ? error.message : String(error))
    } finally {
      event.target.value = ''
    }
  }

  const simulateAgent = async () => {
    return { content: t.serverError }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    setPending(true)
    const newMessage: Message = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, newMessage])
    const prompt = input.trim()
    setInput('')

    const mode = activeControlTab === 'agentic-rag' ? 'agentic_rag' : 'rag'

    const payload = {
      model: selectedModel,
      enableWebSearch,
      enableTools,
      message: prompt,
      file: documents.length > 0 ? documents.map((doc) => doc.name) : null,
      mode,
    }

    try {
      const csrfToken = getCsrfToken()
      const response = await fetch('/api/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Backend responded with status ${response.status}`)
      }

      let backendPayload: unknown = null
      try {
        backendPayload = await response.json()
      } catch (error) {
        console.warn('Failed to parse backend JSON response', error)
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: formatBackendResponse(backendPayload) },
      ])
    } catch (error) {
      console.error('Failed to fetch backend response, falling back to simulation', error)
      const fallbackResponse = await simulateAgent()
      setMessages((prev) => [...prev, { role: 'assistant', ...fallbackResponse }])
    } finally {
      setPending(false)
    }
  }

  const handleClear = () => {
    setMessages([{ role: 'assistant', content: t.welcome }])
  }

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, pending])

  const renderAgenticRagPanel = () => (
    <div className="card-body flex min-h-0 flex-1 flex-col gap-4 text-sm lg:overflow-y-auto">
      <div className="panel-header flex flex-col gap-3">
        <header className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary whitespace-nowrap">
              {t.agenticTitle}
            </p>
            <div className="flex w-full justify-end sm:hidden">
              <label className="sr-only" htmlFor="language-select-agentic">
                {t.language}
              </label>
              <select
                id="language-select-agentic"
                className="select select-bordered select-xs w-full max-w-[12rem]"
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                aria-label="Select interface language"
              >
                <option value="zh">简体中文</option>
                <option value="zh-hant">繁體中文</option>
                <option value="en">English</option>
              </select>
            </div>
            <div
              className="language-switch join hidden flex-nowrap whitespace-nowrap sm:flex sm:pr-2"
              aria-label="Select interface language"
            >
              <button
                className={`btn btn-xs join-item px-1.5 ${language === 'zh' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage('zh')}
              >
                简体中文
              </button>
              <button
                className={`btn btn-xs join-item px-1.5 ${language === 'zh-hant' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage('zh-hant')}
              >
                繁體中文
              </button>
              <button
                className={`btn btn-xs join-item px-1.5 ${language === 'en' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage('en')}
              >
                English
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold leading-tight whitespace-nowrap">
            {t.agenticHeading}
          </h1>
          <p className="text-sm opacity-80">{t.agenticSubtitle}</p>
        </header>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:auto-rows-[max-content]">
        <div className="panel-tile flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100/70 p-4 shadow-sm">
          <p className="text-base font-semibold text-primary">{t.agenticObserveTitle}</p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.agenticObserveDescription}</p>
        </div>

        <div className="panel-tile flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100/70 p-4 shadow-sm">
          <p className="text-base font-semibold text-primary">{t.agenticThinkTitle}</p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.agenticThinkDescription}</p>
        </div>

        <div className="panel-tile flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100/70 p-4 shadow-sm">
          <p className="text-base font-semibold text-primary">{t.agenticActTitle}</p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.agenticActDescription}</p>
        </div>
      </div>
    </div>
  )

  const renderControlPanelContent = () => (
    <div className="card-body flex min-h-0 flex-1 flex-col gap-3 text-sm lg:overflow-y-auto">
      <div className="panel-header flex flex-col gap-3">
        <header className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary whitespace-nowrap">{t.ragTitle}</p>
            <div className="flex w-full justify-end sm:hidden">
              <label className="sr-only" htmlFor="language-select">
                {t.language}
              </label>
              <select
                id="language-select"
                className="select select-bordered select-xs w-full max-w-[12rem]"
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                aria-label="Select interface language"
              >
                <option value="zh">简体中文</option>
                <option value="zh-hant">繁體中文</option>
                <option value="en">English</option>
              </select>
            </div>
            <div
              className="language-switch join hidden flex-nowrap whitespace-nowrap sm:flex sm:pr-2"
              aria-label="Select interface language"
            >
              <button
                className={`btn btn-xs join-item px-1.5 ${language === 'zh' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage('zh')}
              >
                简体中文
              </button>
              <button
                className={`btn btn-xs join-item px-1.5 ${language === 'zh-hant' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage('zh-hant')}
              >
                繁體中文
              </button>
              <button
                className={`btn btn-xs join-item px-1.5 ${language === 'en' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage('en')}
              >
                English
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold leading-tight whitespace-nowrap">{t.ragHeading}</h1>
          <p className="text-sm opacity-80">{t.subtitle}</p>
        </header>
      </div>

      <div className="control-grid grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-none lg:auto-rows-[max-content]">
        <div className="panel-tile flex flex-col rounded-2xl border border-base-300 bg-base-100/70 p-3 shadow-sm">
          <p className="text-base font-semibold text-primary">{t.modelTitle}</p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.modelDescription}</p>
          <label className="label mb-1" htmlFor="model-select">
            <span className="label-text font-semibold">{t.modelLabel}</span>
          </label>
          <select
            id="model-select"
            className="select select-bordered mt-1 w-full"
            value={selectedModel}
            onChange={(event) => setSelectedModel(event.target.value)}
          >
            {modelOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="panel-tile flex min-h-0 flex-col rounded-2xl border border-base-300 bg-base-100/70 p-3 shadow-sm">
          <p className="text-base font-semibold text-primary">
            {t.webSearchTitle}
          </p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.webSearchDescription}</p>
          <label className="label w-full cursor-pointer items-start justify-start gap-2 text-left">
            <input
              type="checkbox"
              className="checkbox"
              checked={enableWebSearch}
              onChange={(event) => setEnableWebSearch(event.target.checked)}
            />
            <span className="label-text min-w-0 flex-1 break-words font-semibold leading-snug">
              {t.webSearch}
            </span>
          </label>
        </div>

        <div className="panel-tile flex min-h-0 flex-col rounded-2xl border border-base-300 bg-base-100/70 p-3 shadow-sm md:col-span-2">
          <p className="text-base font-semibold text-primary">
            {t.knowledgeBaseTitle}
          </p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.knowledgeBaseDescription}</p>
          <div className="form-control">
            <label className="label flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="label-text font-semibold">{t.uploadLabel}</span>
              <span className="label-text-alt w-full text-left opacity-70 sm:w-auto sm:text-right">
                {documents.length ? `${documents.length} ${t.uploaded}` : t.uploadHint}
              </span>
            </label>
            <input
              type="file"
              accept=".txt,.doc"
              multiple
              className="file-input file-input-bordered"
              onChange={handleUpload}
            />
            <p className="mt-2 text-xs text-base-content/60">{t.supportedFormats}</p>
            {uploadStatus === 'uploading' && (
              <p className="mt-2 text-xs text-info">{t.uploading}</p>
            )}
            {uploadStatus === 'success' && (
              <p className="mt-2 text-xs text-success">{t.uploadSuccess}</p>
            )}
            {uploadStatus === 'error' && (
              <p className="mt-2 text-xs text-error">
                {t.uploadError}
                {uploadError ? ` (${uploadError})` : null}
              </p>
            )}
            {documents.length > 0 && (
              <ul className="mt-2 space-y-1 rounded-box bg-base-200 p-3 text-sm">
                {documents.map((file) => (
                  <li key={file.name} className="flex items-center justify-between">
                    <span>{file.name}</span>
                    <span className="text-xs opacity-60">{(file.size / 1024).toFixed(1)} KB</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="panel-tile flex min-h-0 flex-col rounded-2xl border border-base-300 bg-base-100/70 p-3 shadow-sm md:col-span-2 lg:overflow-y-auto">
          <p className="text-base font-semibold text-primary">
            {t.toolsTitle}
          </p>
          <p className="mb-3 mt-1 text-sm opacity-70">{t.toolsDescription}</p>
          <label className="label w-full cursor-pointer items-start justify-start gap-2 text-left">
            <input
              type="checkbox"
              className="checkbox"
              checked={enableTools}
              onChange={(event) => setEnableTools(event.target.checked)}
            />
            <span className="label-text min-w-0 flex-1 break-words font-semibold leading-snug">{t.tools}</span>
          </label>
          <div className="divider my-2" />
          <p className="text-sm font-semibold">{t.chooseTools}</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-box border border-base-200 bg-base-100/80 p-2"
              >
                <span className="label-text min-w-0 flex-1 break-words font-semibold leading-snug opacity-70">
                  {tool.label[language]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-shell flex min-h-screen w-full flex-col bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-6 text-base-content lg:h-screen lg:overflow-hidden lg:px-10 lg:py-4">
      <div className="app-layout mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-5 lg:h-full lg:gap-7">
        <div className="app-columns grid min-h-0 flex-1 grid-cols-1 gap-5 lg:h-full lg:grid-cols-5 lg:items-stretch">
          <section className="card control-panel flex h-full min-h-0 flex-col border border-base-300 bg-base-100 shadow-2xl lg:col-span-2 lg:overflow-hidden">
            <div className="flex h-full flex-col">
              <div className="px-6 py-2">
                <div className="mode-tabs" role="tablist" aria-label="Control panel modes">
                  {controlTabs.map((tab) => {
                    const isActive = activeControlTab === tab.id

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        className={`mode-tab ${isActive ? 'mode-tab-active' : ''}`}
                        aria-selected={isActive}
                        onClick={() => setActiveControlTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex min-h-0 flex-1 flex-col">
                {activeControlTab === 'rag' ? renderControlPanelContent() : renderAgenticRagPanel()}
              </div>
              <div className="mt-auto border-t border-base-300 px-6 py-1">
                <a
                  className="btn btn-ghost btn-sm gap-2"
                  href="https://github.com/justin0x5eed/agentic_rag"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.595 2 12.227c0 4.501 2.865 8.317 6.839 9.676.5.095.682-.222.682-.494 0-.243-.009-.888-.014-1.744-2.782.617-3.37-1.372-3.37-1.372-.455-1.178-1.11-1.492-1.11-1.492-.908-.636.069-.623.069-.623 1.004.073 1.532 1.06 1.532 1.06.893 1.556 2.345 1.107 2.916.846.092-.666.35-1.108.636-1.362-2.22-.259-4.555-1.138-4.555-5.07 0-1.12.389-2.034 1.029-2.751-.104-.26-.446-1.304.098-2.72 0 0 .84-.273 2.75 1.05A9.368 9.368 0 0 1 12 7.516a9.37 9.37 0 0 1 2.5.346c1.909-1.323 2.748-1.05 2.748-1.05.545 1.416.203 2.46.1 2.72.64.717 1.028 1.63 1.028 2.75 0 3.94-2.338 4.809-4.565 5.063.359.317.678.942.678 1.899 0 1.372-.012 2.477-.012 2.814 0 .274.18.593.688.492C19.139 20.54 22 16.726 22 12.227 22 6.595 17.523 2 12 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">{t.githubLink}</span>
                </a>
              </div>
            </div>
          </section>

          <section
            className="card flex h-full min-h-0 flex-col overflow-hidden border border-base-300 bg-base-100 shadow-2xl lg:col-span-3"
          >
            <div className="card-body flex min-h-0 flex-1 flex-col">
              <header className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{t.chatTitle}</h2>
                  <p className="text-sm opacity-70">{t.chatSubtitle}</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={handleClear}>
                  {t.clear}
                </button>
              </header>

              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <div
                  ref={chatWindowRef}
                  className="chat-window flex-1 min-h-0 overflow-y-auto rounded-box border border-base-200 p-3"
                >
                  {messages.map((message, index) => (
                    <div key={index} className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                      <div className="chat-header mb-1 text-xs uppercase tracking-wide opacity-60">
                        {message.role === 'user' ? t.participants.user : t.participants.agent}
                      </div>
                      <div className="chat-bubble max-w-full whitespace-pre-wrap text-left">
                        {normalizeMessageContent(message.content)}
                      </div>
                      {message.annotations?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.annotations.map((annotation) => (
                            <div key={annotation} className="badge badge-outline">
                              {annotation}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {pending && (
                    <div className="chat chat-start opacity-70">
                      <div className="chat-bubble animate-pulse">...</div>
                    </div>
                  )}
                </div>

                <label className="form-control w-full">
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    placeholder={t.inputPlaceholder}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                </label>
                <div className="flex justify-end gap-2">
                  <button className="btn btn-outline" onClick={handleClear}>
                    {t.clear}
                  </button>
                  <button className="btn btn-primary" onClick={handleSend} disabled={pending}>
                    {pending ? '...' : t.send}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
