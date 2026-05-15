const ADMIN_NOTIFY_PHONE = process.env.ADMIN_NOTIFY_PHONE || '919743012255'
const ADMIN_PANEL_URL = process.env.ADMIN_PANEL_URL || 'http://localhost:3000/admin'
const NOTIFICATION_PROVIDER = process.env.NOTIFICATION_PROVIDER || 'none'

function buildRequirementMessage(request) {
  const lines = [
    'New project requirement submitted.',
    `Name: ${request.fullName}`,
    `Email: ${request.email}`,
    `Phone: ${request.phoneNumber}`,
    `Domain: ${request.projectDomain}`,
    `Type: ${request.projectType}`,
    `Title: ${request.projectTitle}`,
    `Request ID: ${request._id}`,
    `Admin Panel: ${ADMIN_PANEL_URL}`,
  ]

  return lines.join('\n')
}

async function sendWebhookNotification(payload) {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL

  if (!webhookUrl) {
    return { sent: false, reason: 'NOTIFICATION_WEBHOOK_URL not configured' }
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Webhook notification failed with status ${response.status}`)
  }

  return { sent: true, provider: 'webhook' }
}

async function sendCallMeBotWhatsApp(message) {
  const apiKey = process.env.CALLMEBOT_API_KEY

  if (!apiKey) {
    return { sent: false, reason: 'CALLMEBOT_API_KEY not configured' }
  }

  const url = new URL('https://api.callmebot.com/whatsapp.php')
  url.searchParams.set('phone', ADMIN_NOTIFY_PHONE)
  url.searchParams.set('text', message)
  url.searchParams.set('apikey', apiKey)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`CallMeBot notification failed with status ${response.status}`)
  }

  return { sent: true, provider: 'callmebot' }
}

export async function sendAdminRequirementNotification(request) {
  const message = buildRequirementMessage(request)
  const payload = {
    to: ADMIN_NOTIFY_PHONE,
    message,
    adminUrl: ADMIN_PANEL_URL,
    requestId: String(request._id),
    request: {
      fullName: request.fullName,
      email: request.email,
      phoneNumber: request.phoneNumber,
      projectDomain: request.projectDomain,
      projectType: request.projectType,
      projectTitle: request.projectTitle,
    },
  }

  try {
    if (NOTIFICATION_PROVIDER === 'webhook') {
      return await sendWebhookNotification(payload)
    }

    if (NOTIFICATION_PROVIDER === 'callmebot') {
      return await sendCallMeBotWhatsApp(message)
    }

    return {
      sent: false,
      reason: 'Notifications disabled. Set NOTIFICATION_PROVIDER=webhook or callmebot',
      preview: payload,
    }
  } catch (error) {
    console.error('Admin notification error:', error.message)
    return { sent: false, reason: error.message }
  }
}
