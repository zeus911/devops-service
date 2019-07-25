package io.choerodon.devops.infra.feign.fallback;

import java.util.Map;

import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Component;
import retrofit2.Call;

import io.choerodon.devops.api.vo.*;
import io.choerodon.devops.infra.dto.iam.MarketAppDeployRecordDTO;
import io.choerodon.devops.infra.feign.AppShareClient;

/**
 * Creator: ChangpingShi0213@gmail.com
 * Date:  19:57 2019/7/2
 * Description:
 */
@Component
public class AppShareClientFallback implements AppShareClient {
    @Override
    public Call<PageInfo<RemoteApplicationVO>> getAppShares(Map<String, Object> map) {
        return null;
    }

    @Override
    public Call<PageInfo<ApplicationVersionRespVO>> listVersionByAppId(Long appId, Map<String, Object> map) {
        return null;
    }

    @Override
    public Call<AppVersionAndValueVO> getConfigInfoByVerionId(Long appId, Long versionId, Map<String, Object> map) {
        return null;
    }

    @Override
    public Call<AccessTokenCheckResultVO> checkTokenExist(String accessToken) {
        return null;
    }

    @Override
    public Call<Void> createAppDeployRecord(String accessToken, MarketAppDeployRecordDTO marketAppDeployRecordDTO) {
        return null;
    }
}
