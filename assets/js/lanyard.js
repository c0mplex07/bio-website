document.addEventListener('DOMContentLoaded', () => {
  const userId = '880694639227699290'; //replace your discord id here
  const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;
  
  const avatar = document.getElementById('discord-avatar');
  const username = document.getElementById('discord-username');
  const statusDot = document.getElementById('discord-status-dot');
  const statusText = document.getElementById('discord-status-text');
  const activityInfo = document.getElementById('discord-activity-info');
  const noActivity = document.getElementById('discord-no-activity');
  const activityName = document.getElementById('discord-activity-name');
  const activityDetails = document.getElementById('discord-activity-details');
  const activityState = document.getElementById('discord-activity-state');
  const albumArt = document.getElementById('discord-album-art');
  
  async function updateDiscordStatus() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.success) {
        const discord = data.data;
        
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${discord.discord_user.avatar}.png`;
        avatar.src = avatarUrl;
        
        username.textContent = discord.discord_user.username;
        
        const status = discord.discord_status || 'offline';
        statusDot.className = `status-${status}`;
        statusText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        
        const activity = discord.activities.find(a => a.type === 0);
        
        if (activity) {
          activityInfo.classList.remove('hidden');
          noActivity.classList.add('hidden');
          
          activityName.textContent = activity.name;
          activityDetails.textContent = activity.details || '';
          activityState.textContent = activity.state || '';
          
          if (activity.assets?.large_image) {
            const assetUrl = getAssetUrl(activity.assets.large_image, activity.application_id);
            albumArt.style.backgroundImage = `url('${assetUrl}')`;
          } else {
            albumArt.style.backgroundImage = '';
          }
        } else {
          activityInfo.classList.add('hidden');
          noActivity.classList.remove('hidden');
        }
      }
    } catch (error) {
      console.error('Error fetching Discord status:', error);
    }
  }
  
  function getAssetUrl(asset, applicationId) {
    if (asset.startsWith('mp:')) {
      return `https://media.discordapp.net/${asset.replace('mp:', '')}`;
    }
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
  }
  
  updateDiscordStatus();
  setInterval(updateDiscordStatus, 10000);
});